var express = require('express'); 
const User = require('../src/db/schemas/user.js') 
const AdminBro = require('admin-bro') 
const AdminBroMongoose = require('@admin-bro/mongoose') 
const AdminBroExpressjs = require('@admin-bro/express') 
//const canEditEmp = ({ currentAdmin, record }) => { return currentAdmin && ( currentAdmin.role === 'admin' ) } 
//const dotenv = require("dotenv");
//dotenv.config();
var app = express(); 
const mongoose = require('mongoose');//Routes 
app.get('/', function (req, res) {
     res.send('Hello World!'); 
}); 
//Database 
const DB_URL ="mongodb+srv://kimdahyeon:dnjs1569@cluster0.wrb2k.mongodb.net/myFirstDatabase" 
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);
//권한부여
const canEdit = ({ currentAdmin, record }) => {
    return currentAdmin && (
      currentAdmin.role === 'admin'
      || currentAdmin.id === record.param('userId') //currentAdmin의 유저id와 project의 userId와 비교
    )
  }
//Admin Bro 
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin' 
AdminBro.registerAdapter(AdminBroMongoose) 
const AdminBroOptions = {
    resources: [{
        resource: User,
        options: {
          properties: {
            userId: { isVisible: { edit: false, show: true, list: true, filter: true } }
          },
          actions: {
            edit: { isAccessible: canEdit },
            delete: { isAccessible: canEdit },
            new: {
              before: async (request, { currentAdmin }) => {
                request.payload = {
                  ...request.payload,
                  userId: currentAdmin.id,
                }
                return request
              },
            }
          }
        }
      },
      {
        resource: User,
        options: {
          properties: {
            encryptedPassword: { isVisible: false },
            password: {
              type: 'string',
              isVisible: {
                list: false, edit: true, filter: false, show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if(request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined,
                  }
                }
                return request
              },
            },
            edit: { isAccessible: canModifyUsers },
            delete: { isAccessible: canModifyUsers },
            new: { isAccessible: canModifyUsers },
          }
        }
      }], 
    } 
//로그인 페이지 추가
const adminBro = new AdminBro(AdminBroOptions) 
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        console.log(user) 
        if (user) {
            if (password === user.encryptedPassword) {
                return user 
            } 
        } return false 
    }, 
    cookiePassword: 'session Key', 
}) 
app.use(adminBro.options.rootPath, router) 
app.listen(3000, function () {
     console.log('Listening to Port 3000'); 
});


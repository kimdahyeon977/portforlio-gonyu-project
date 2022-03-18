import { Schema, model, Mongoose, Types } from "mongoose";

const projectId=require('./types/projectId.js')//projectId가 자동으로 생성되서 사용할 수 있다.
const projectSchema = new Schema(
  {
    projectId, //프로젝트 고유아이디
    user_id:{type: Schema.Types.ObjectId, ref:'User', required:true}, //user_id는 로그인 할때 생성한 유저의 고윳값( _id ) 
    title: { //프로젝트 이름
      type: String,
      required: true,
    },
    task: { //어떤 업무수행했는지
      type: String,
      required: true,
    },
    date: { //프로젝트 수행 날짜
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", projectSchema);

export { ProjectModel };


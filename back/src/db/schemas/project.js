import { Schema, model, Mongoose, Types } from "mongoose";
const projectId=require('./types/projectId.js')//projectId가 자동으로 생성되서 사용할 수 있다.
const projectSchema = new Schema(
  {
    projectId, //프로젝트 고유아이디
    author:{type: Schema.Types.ObjectId, ref:'user', required:true},  // 프론트에서 받아와야하는 것 : decode(jwt)해서 userId 찾아내기
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


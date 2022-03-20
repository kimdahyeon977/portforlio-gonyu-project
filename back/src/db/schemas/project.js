import { Schema, model } from "mongoose";
const id=require('./types/projectId.js')//projectId가 자동으로 생성되서 사용할 수 있다.
const projectSchema = Schema(
  {
    id, //프로젝트 고유아이디
    user_id:{ //프로젝트 이름
      type: String,
      required: true,
    },
    title: { //프로젝트 이름
      type: String,
      required: true,
    },
    task: { //어떤 업무수행했는지
      type: String,
      required: true,
    },
    from_date: { //프로젝트 수행 날짜
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", projectSchema);

export { ProjectModel };



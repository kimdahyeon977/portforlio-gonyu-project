import { Schema, model } from "mongoose";
const projectId=require('./types/projectId.js')//projectId가 자동으로 생성되서 사용할 수 있다.
/*
const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
try {
  const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
  const jwtDecoded = jwt.verify(userToken, secretKey);
  const user_id = jwtDecoded.user_id;
  req.currentUserId = user_id;
  const userId = req.currentUserId;
} catch (error) {
  res.status(400).send("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
}
*/
const projectSchema = new Schema(
  {
    projectId, //프로젝트 고유아이디
    //userId ,  // 프론트에서 받아와야하는 것 : decode(jwt)해서 userId 찾아내기
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


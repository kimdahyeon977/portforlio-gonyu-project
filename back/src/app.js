import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { AwardRouter } from "./routers/awardRouter";
import { likeRouter } from "./routers/likeRouter";
import { projectRouter } from "./routers/projectRouter";
const app = express(); // CORS 에러 방지

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(likeRouter);
app.use(AwardRouter);
app.use(projectRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨) //제일 아래에 둬야..
app.use(errorMiddleware);

export { app };


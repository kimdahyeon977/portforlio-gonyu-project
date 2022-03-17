import is from "@sindresorhus/is"; //어떤 모듈인지
import { Router as expressRouter} from "express";
import { projectService } from "../services/projectService";
import { login_required } from '../middlewares/login_required';
const router= expressRouter();
const projectRouter = expressRouter();
router.use(login_required);//라우터를 전역으로 쓰고 싶다면
//아래에 있는 것들은 이 부분을 거쳐야한다.

projectRouter.post("/project/register", async function (req, res, next) { //추가
  //미들웨어 구현해야함 내 포트폴리오에만 추가버튼 있게
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const task = req.body.task;
    const date = req.body.date;

    // 위 데이터를 유저 db에 추가하기
    const newProject = await projectService.add({
      title,
      task,
      date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});
projectRouter.get('/project/:projectId',async(req,res,next)=>{ //projectId로 조회
  try{
      const {projectId} = req.params
      const project=await projectService.find({projectId})
      if(project.errorMessage){
        throw new Error(project.errorMessage)
    }
      res.status(200).send(project)
  }catch(err){
    next(err)
  }
})
/*
projectRouter.get('/project/:user_id',async(req,res,next)=>{ //userId로 조회
  try{
      const user_id = req.params.userId
      const projects=await projectService.find({userId})
      res.status(200).send(projects)
      if(projects.errorMessage){
            throw new Error(projects.errorMessage)
        }

  }catch(err){
    next(err)
  }
})
*/
projectRouter.put( //수정
  "/project/:projectId", //미들웨어 구현해야함 내 포트폴리오에만 수정버튼 있게
  async function (req, res, next) {
    try {
      const {projectId} = req.params
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const task = req.body.task ?? null;
      const date = req.body.date ?? null;

      const toUpdate = { title, task, date };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.set({ projectId, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete("/project/:projectId", //미들웨어 구현해야함 내 포트폴리오에만 삭제버튼 있게
async (req, res, next) => {
  try{
    const {projectId} = req.params
    const deletedProject= await projectService.delete({ projectId });
    if (deletedProject.errorMessage) {
      throw new Error(deletedProject.errorMessage);
    }

    res.status(200).json(deletedProject); 
  }catch (error){
    next(error);
  }
}
);

export { projectRouter };


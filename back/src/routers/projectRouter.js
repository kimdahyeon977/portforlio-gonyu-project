import is from "@sindresorhus/is"; //어떤 모듈인지
import { Router } from "express";
import { projectservice as projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
const projectRouter = Router();
projectRouter.use(login_required)

projectRouter.post("/project/create",
async function (req, res, next) { //추가
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const user_id = req.currentUserId;
    const task = req.body.task;
    const date = req.body.date;

    // 위 데이터를 유저 db에 추가하기
    const newProject = await projectService.add({
      title,
      user_id,
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
projectRouter.get('/project/:id',
async(req,res,next)=>{ //projectId로 조회
  try{
      const {id} = req.params
      const project=await projectService.find({id})
      if(project.errorMessage){
        throw new Error(project.errorMessage)
    }
      res.status(200).send(project)
  }catch(err){
    next(err)
  }
})


projectRouter.get(
  "/projectlist/:id",
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await projectService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }
      /*
      if (){//다른사람페이지에서 수정,추가,삭제하려고 할때 프론트에서 요청정보 받아옴
          try{
          if(req.currentId !== user_id) throw new Error('접근권한이 없습니다.');
        }catch(error){
          next(error)
        }
      }
      */
      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put( //수정
  "/project/:id",
  async function (req, res, next) {
    try {
      const {id} = req.params
      const projectCheck = await projectService.getProject({ project_id });
        if(projectCheck.userId !== req.currentUserId){
           throw new Error("접근권한이 없습니다.");
        }
      // body data 로부터 업데이트할 플젝 정보를 추출함.
      const title = req.body.title ?? null;
      const task = req.body.task ?? null;
      const date = req.body.date ?? null;

      const toUpdate = { title, task, date };

      // 고유 플젝로 플젝정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.set({ id, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete("/project/:id", 
async (req, res, next) => {
  try{
    const {id} = req.params
    const deletedProject= await projectService.delete({ id });
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


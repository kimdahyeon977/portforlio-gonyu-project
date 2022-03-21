import is from "@sindresorhus/is"; //어떤 모듈인지
import { Router } from "express";
import { projectservice as projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import { util } from "../middlewares/utils";
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
    const user_id = req.currentUserId;
    const { title, task, from_date, to_date } = req.body;
    const newProject = await projectService.add({user_id, title, task, from_date, to_date });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});
projectRouter.get('/project/:id', async (req, res, next) => { //플젝 조회
  try{
      const id = req.params.id;
      const project = await projectService.find({ id });
      
      if(project.errorMessage){
          throw new Error(project.errorMessage);
      }
      res.status(200).send(project);

  } catch(err) {
      next(err);
  }
})


projectRouter.get(
  "/projectlist/:id",
  async(req,res,next)=>{ //유저아이디로 조회
    try{
        const user_id = req.params.id
        const currentUserInfo = await projectService.getUserInfo({user_id});
        if(currentUserInfo.errorMessage){
          throw new Error(currentUserInfo.errorMessage)
      }
        res.status(200).send(currentUserInfo)
    }catch(err){
      next(err);
    }
  })
  

projectRouter.put( //수정
  "/project/:id",
  async function (req, res, next) {
    try {
      const {id} = req.params
      const permission = await projectService.find({id});
      util.noPermission(permission.user_id, req.currentUserId)
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { title, task, from_date, to_date } = req.body; 
      const toUpdate = { title, task, from_date, to_date }; 

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
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
    const permission = await projectService.find({id});
    util.noPermission(permission.user_id, req.currentUserId)
    const deletedProject= await projectService.delete({ id });
    if (deletedProject.errorMessage) {
      throw new Error(deletedProject.errorMessage);
    }

    res.send("ok")
  }catch (error){
    next(error);
  }
}
);

export { projectRouter };


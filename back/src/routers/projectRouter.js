import is from "@sindresorhus/is"; //어떤 모듈인지
import { Router } from "express";
import { projectservice as projectService } from "../services/projectService";
import { userAuthService } from "../services/userService";
import { login_required } from "../middlewares/login_required";
import { util } from "../common/utils";
const projectRouter = Router();
projectRouter.use(login_required)

projectRouter.post("/project/create",
async function (req, res, next) { //추가
  try {  //이런부분들도 다 빼야하는지 오피스아워
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const { title, task, fromDate, toDate } = req.body;
    const newProject = await projectService.addProject({userId, title, task, fromDate, toDate });

    if(newProject.errorMessage){
      throw new Error(newProject.errorMessage);
    }
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});
projectRouter.get('/project/:id', async (req, res, next) => { //플젝 조회
  try{
      const projectId = req.params.id;
      const project = await projectService.getProject({ projectId });

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
        const userId = req.params.id
        const currentUserInfo = await projectService.getUserInfo({userId});
        if(currentUserInfo.errorMessage){
          throw new Error(currentUserInfo.errorMessage)
      }
        res.status(200).send(currentUserInfo)
    }catch(err){
      next(err);
    }
  })
projectRouter.get(
    "/projectlist",    //관리자모드에서 전체 플젝목록을 얻음
    async function (req, res, next) {
      try {
        //현재 로그인한 사용자 정보추출
        const user_id = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
          user_id,
        });
        util.adminshow(currentUserInfo)//해당부분 에러발생
        const projects = await projectService.getProjects();
        res.status(200).send(projects);
      } catch (error) {
        next(error);
      }
    }
  )

  

projectRouter.put( //수정
  "/project/:id",
  async function (req, res, next) {
    try {
      //현재 로그인한 사용자 정보추출
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });
      //project owner정보 추출
      const projectId = req.params.id
      const permission = await projectService.getProject({projectId});
      util.noPermission(permission, currentUserInfo)
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { title, task, fromDate, toDate } = req.body; 
      const toUpdate = { title, task, fromDate, toDate }; 

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.setProject({ projectId, toUpdate });

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete("/project/:id",  //삭제
async (req, res, next) => {
  try{
    const projectId = req.params.id
      const permission = await projectService.getProject({projectId});
    util.noPermission(permission.userId, req.currentUserId)
    const deletedProject= await projectService.deleteProject({ projectId });
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


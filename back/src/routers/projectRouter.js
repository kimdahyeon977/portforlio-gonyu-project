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
  try {  
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const { title, task, fromDate, toDate } = req.body;
    if( !userId || !title || !fromDate || !toDate){
      throw new Error("필수입력값을 모두 입력해주세요.")
      }
    const newProject = await projectService.addProject({userId, title, task, fromDate, toDate });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});
projectRouter.get('/projects/:id', async (req, res, next) => { //플젝 조회
  try{
      const projectId = req.params.id;
      const project = await projectService.getProject({ projectId });
      res.status(200).send(project);

  } catch(err) {
      next(err);
  }
})


projectRouter.get(
  "/projectlist/:id/:sortKey?",
  async(req,res,next)=>{ //유저아이디로 조회
    try{
      const userId = req.params.id;
      const sortKey = req.params.sortKey;
      const projectList = await projectService.getUserInfo({
        userId,
        sortKey
      });
        res.status(200).send(projectList)
    }catch(err){
      next(err);
    }
  })
projectRouter.get(
    "/projectlist",    //관리자모드에서 전체 플젝목록을 얻음
    async function (req, res, next) {
      try {
        //현재 로그인한 사용자 정보추출
        const userId = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo({
          userId,
        });
        util.isAdmin(currentUserInfo.role)
        const projects = await projectService.getProjects();
        res.status(200).send(projects);
      } catch (error) {
        next(error);
      }
    }
  )

  

projectRouter.put( //수정
  "/projects/:id",
  async function (req, res, next) {
    try {
      //현재 로그인한 사용자 정보추출
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      //project owner정보 추출
    const projectId = req.params.id
    const ownerId = await projectService.getProject({ projectId })
    //console.log(ownerId.userId)
    //console.log(currentUserInfo)
    util.hasPermission(ownerId.userId, currentUserInfo);
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { title, task, fromDate, toDate } = req.body; 
      const toUpdate = { title, task, fromDate, toDate }; 
      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedProject = await projectService.setProject({ projectId, toUpdate });

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete("/projects/:id",  //삭제
async (req, res, next) => {
  try{
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      //project owner정보 추출
    const projectId = req.params.id
    const ownerId = await projectService.getProject({ projectId });
    util.hasPermission(ownerId.userId, currentUserInfo);
    const result= await projectService.deleteProject({ projectId });
    res.json(result);
  }catch (error){
    next(error);
  }
}
);

export { projectRouter };


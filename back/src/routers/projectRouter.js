import is from "@sindresorhus/is"; //어떤 모듈인지
import { Router } from "express";
import { projectservice as projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import { userRouter } from "./userRouter";
const projectRouter = Router();
projectRouter.use(login_required)
//projectRouter.use(userRouter)
projectRouter.post("/create",  async function (req, res, next) {
  console.log(userId);
  //console.log(user_id);
  /*
  try {
    // project요청시 jwt토큰에서 해독한 요청한 사용자의 아이디 : user_id
    const user_id : 

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }
    console.log(user.id)
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
  */
 next();
},
async function (req, res, next) { //추가
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
projectRouter.get('/:id',
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

projectRouter.get('/:user_id',async(req,res,next)=>{ //userId로 조회
  try{
    const {user_id} = req.params
      const projects=await projectService.findList({user_id})
      res.status(200).send(projects)
      if(projects.errorMessage){
            throw new Error(projects.errorMessage)}
      res.status(200).send(projects)
  }catch(err){
    next(err)
  }
})

projectRouter.put( //수정
  "/:id",
  async function (req, res, next) {
    try {
      const {id} = req.params
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

projectRouter.delete("/:id", 
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


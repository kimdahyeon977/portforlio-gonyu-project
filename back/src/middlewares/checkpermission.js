import { project } from "../db/schemas/project";
function checkpermission(req, res, next) {
  project.findOne({_id:req.params.id}, function(err,project){
    console.log(req.user.id)
    console.log(project.author)
    if(err) return res.json(err);
    if(project.author != req.user.id)
      res.status(400).send("접근이 불가합니다.");
      //redirect('/user/login)//로그인 페이지로 다시 redirect
    next();
  })
  };
export { checkpermission };
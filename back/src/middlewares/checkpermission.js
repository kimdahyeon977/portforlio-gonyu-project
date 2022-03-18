import { project } from "../db/schemas/project";
function checkpermission(req, res, next) {
  project.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    if(post.author != req.user.id)
      return ('접근이 불가능합니다.')
    next();
  });
  }
export { checkpermission };
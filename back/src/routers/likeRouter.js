import { Router } from "express";
import { util } from "../common/utils";
import { likeService } from "../services/likeService";
import { userAuthService } from "../services/userService";
const Likerouter = Router()
Likerouter.post("/like/:userId", async function(req,res,next){
    try {
 
        //adminId는 좋아요누른 사람 Id (즉, 현재 로그인 되어있는 사람)
        const adminId= req.currentUserId
        const currentUserInfo = await userAuthService.getUserInfo({
            user_id: req.currentUserId
          });
        
        util.isRecruter(currentUserInfo)
        //userId는 게시글 id 
        const {userId} = req.params
        // add DB
        const likeAdd = await likeService.addLike({
            userId,
            adminId
        })
        if (likeAdd.errorMessage){
        throw new Error(likeAdd.errorMessage)
    }
    res.status(201).json(likeAdd)
    } catch(error){
        next(error)
    }
})

Likerouter.get("/likecount/:userId",async function(req,res,next){ 
    try {
        const {userId} = req.params
        const counts = await likeService.likeCount({userId})

        res.status(200).json(counts)
    }catch (error) {
        next(error)
    }
})
Likerouter.get("/likelist/:adminId",async function(req,res,next){ //좋아요한 목록 받아오기
    try {
        const {adminId} = req.params
        const likes = await likeService.getLikeList({adminId})
        res.status(200).json(likes)
    }catch (error) {
        next(error)
    }
})

Likerouter.delete("/like/:userId", async function (req, res, next) {  // 동작 확인
    try {
      const {userId} = req.params//좋아요를 취소할 유저아이디 : userId
      //login_requied에서 현재 로그인한 아이디는 adminId
      const adminId= req.currentUserId 
      //console.log(adminId)
      // 위 id를 이용하여 db에서 데이터 삭제하기
      const result = await likeService.deleteLike({ adminId, userId });
  
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.send("삭제완료되었습니다.")
    } catch (error) {
      next(error);
    }
  });

export {Likerouter}


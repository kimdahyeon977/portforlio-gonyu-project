import is from "@sindresorhus/is";
import { Router } from "express";
import { likeService } from "../services/likeService";

const Likerouter = Router()

Likerouter.post("/like/add", async function(req,res,next){
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const {userId,companyId} = req.body
        const like = await likeService.findCompanyId({userId,companyId})
       
        if (!like){
            // add DB
            const likeAdd = await likeService.addLike({
                userId,
                companyId
            })
        if (likeAdd.errorMessage){
            throw new Error(likeAdd.errorMessage)
        }
        res.status(201).json(likeAdd)
        }
        else if (like){
            const result = await likeService.companyUnlike({userId,companyId})
            if (result.errorMessage) {
                throw new Error(result.errorMessage);
              }
          
            res.json('좋아요 취소')
        }

    } catch(error){
        next(error)
    }
})

Likerouter.get("/likecount/:userId",async function(req,res,next){
    try {
        const userId = req.params.userId
        const counts = await likeService.likeCount({userId})

        res.status(200).json(counts)
    }catch (error) {
        next(error)
    }
})

export {Likerouter}

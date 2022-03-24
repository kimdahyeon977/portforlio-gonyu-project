import { Like } from "../db";

class LikeService {
    async addLike({userId,adminId}) {
      
        const newLike = {userId,adminId};
        
        if (!newLike){
          throw new Error('입력정보 없음')
        }
        // db에 저장
        const likeUp = await Like.create({ newLike });
        likeUp.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    
        return likeUp;
      }
    async likeCount({userId}){
        const counts = await Like.findByAdminId({userId})
        return counts
    }

}

const likeService = new LikeService()
export {likeService}
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
        const counts = await Like.findByUserIdCount({userId})
        return counts
    }
    async getLikeList({ adminId }) {
        const likes = await Like.findByAdminId({ adminId });
        
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!likes) {
          throw new Error("좋아요를 누른 내역이 없습니다.")
        }
    
        return likes;
      }
    async deleteLike({ adminId, userId }) {//삭제
        //삭제를 하려면 조건문을 두번 거쳐야한다 
        const likeDel = await Like.findByUserId({ adminId, userId });
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!likeDel) {
          throw new Error("좋아요를 누른 내역이 없습니다.") 
        }
        //좋아요를 여러 유저에게 누른 경우 해당페이지의 유저 좋아요만 취소할 수 있게
        const likeDelete = await Like.deleteById({ adminId, userId });
        return likeDelete
      }

}

const likeService = new LikeService()
export {likeService}


import { Award } from "../db";

class AwardService {
    static async addAward({user_id,title,description}) {
    
      const newAward = {user_id,title,description};
  
      // db에 저장
      const createdNewAward = await Award.create({ newAward });
      createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewAward;
    }
    static async getAwardList({ user_id }) {
      const awards = await Award.findByUserId({ user_id });
      return awards;
    }
}
export {AwardService}
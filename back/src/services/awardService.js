import { Award } from "../db";
import {v4 as uuidv4} from 'uuid' // 랜덤한 값 생성하는 라이브러리

class AwardService {
    static async addAward({user_id,title,description}) {
      
      const id = uuidv4()
      const newAward = {id,user_id,title,description};
  
      // db에 저장
      const createdNewAward = await Award.create({ newAward });
      createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewAward;
    }


    static async getAwardList({ user_id }) {
      const awards = await Award.findByUserId({ user_id });
      return awards;
    }



  static async setAward({ awardId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "수상내역 없음";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }


    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    return award;
  }
  }

export {AwardService}
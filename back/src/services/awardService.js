import { award as Award } from "../db";


class AwardService {
     async addAward({userId,title,description,admissionDate}) {
      
      const newAward = {userId,title,description,admissionDate};
      
      if (!newAward){
        throw new Error('입력정보 없음')
      }
      // db에 저장
      const createdNewAward = await Award.create({ newAward });
      createdNewAward.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewAward;
    }

   async getAwardList({ userId,sortKey }) {
      const awards = await Award.findByUserId({ userId,sortKey });
      return awards;
    }



  async setAward({ awardId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      throw new Error("수상내역 없음")
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



  async getAwardInfo({ awardId }) {
    const award = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      throw new Error("수상내역 없음")
    }

    return award;
  }


  async deleteAward({ awardId }) {//삭제

    let awardDel = await Award.findById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!awardDel) {
      throw new Error("수상내역 없음") 
    }

    const awardDelete = await Award.deleteByid({ awardId });
    return awardDelete
  }
  
}

const awardService = new AwardService()
export {awardService}

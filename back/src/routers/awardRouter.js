import is from "@sindresorhus/is";
import { Router } from "express";
import { AwardService } from "../services/awardService";
const Awardrouter = Router();

Awardrouter.post("/award/create", async function (req, res, next) {  // 작동 됨
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await AwardService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

Awardrouter.get("/awardlist/:user_id", async function (req, res, next) { // 작동됨
  try {
    const user_id = req.params.user_id;
    const awardList = await AwardService.getAwardList({ user_id });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

Awardrouter.put("/awards/:id", async function (req, res, next) {  // 작동 됨
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const award_Id = req.params.id;

    const currentUserInfo = await AwardService.getAwardInfo({ award_Id });

    if (req.currentUserId !== currentUserInfo.user_id){
      throw new Error("해당 아이디가 다릅니다");
    }
    

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description }; 
    
    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const award = await AwardService.setAward({ award_Id, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

Awardrouter.get("/awards/:id", async function (req, res, next) {  // 작동 
    try {
      const award_Id = req.params.id;
      const currentUserInfo = await AwardService.getAwardInfo({ award_Id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

Awardrouter.delete("/awards/:id", async function (req, res, next) {  // 동작 확인
  try {
    const award_Id = req.params.id

    const currentUserInfo = await AwardService.getAwardInfo({ award_Id });

    if (req.currentUserId !== currentUserInfo.user_id){
      throw new Error("해당 아이디가 다릅니다");
    }

    
    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await AwardService.deleteAward({ award_Id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send('삭제완료');
  } catch (error) {
    next(error);
  }
});



export { Awardrouter };
import is from "@sindresorhus/is";
import { Router } from "express";
import { awardService as AwardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";
import { utils } from "../common/utils";

const AwardRouter = Router();
AwardRouter.use(login_required);

AwardRouter.post("/award/create", async function (req, res, next) {
  // 작동 됨
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { userId, title, description } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await AwardService.addAward({
      userId,
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

AwardRouter.get(
  "/awardlist/:userId/:sortKey?",
  async function (req, res, next) {
    // 작동됨
    try {
      const userId = req.params.userId;
      const sortKey = req.query;
      const awardList = await AwardService.getAwardList({ userId, sortKey });
      res.status(200).send(awardList);
    } catch (error) {
      next(error);
    }
  }
);

AwardRouter.put("/awards/:id", async function (req, res, next) {
  // 작동 됨
  try {
    //현재 로그인한 사용자 정보추출
    const userId = req.currentUserId;
    const currentLoginUserInfo = await userAuthService.getUserInfo({
      userId,
    });
    const awardId = req.params.id;
    const permission = await AwardService.getAwardInfo({ awardId });
    utils.noPermission(permission, currentLoginUserInfo);

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const award = await AwardService.setAward({ awardId, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

AwardRouter.get("/awards/:id", async function (req, res, next) {
  // 작동
  try {
    const awardId = req.params.id;
    const currentUserInfo = await AwardService.getAwardInfo({ awardId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

AwardRouter.delete("/awards/:id", async function (req, res, next) {
  // 동작 확인
  try {
    const awardId = req.params.id;

    const currentUserInfo = await AwardService.getAwardInfo({ awardId });
    utils.noPermission(currentUserInfo.userId, req.currentUserId);

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.json("삭제완료");
  } catch (error) {
    next(error);
  }
});

export { AwardRouter };

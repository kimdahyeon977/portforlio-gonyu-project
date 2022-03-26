import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService  } from "../services/certificateService";
import { userAuthService } from "../services/userService";
import { util } from "../common/utils";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.currentUserId;
    // req (request) 에서 데이터 가져오기
    const { title, whenDate, description } = req.body;
    if( !title || !whenDate ){
      throw new Error("필수입력값을 모두 입력해주세요.")
      }
    // 위 데이터를 유저 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      userId,
      title,
      whenDate,
      description,
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificates/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const id = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const Certificate = await certificateService.getCertificate(
      id,
    );
    res.status(200).json(Certificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  try {
    //현재 로그인한 사용자 정보추출
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });
    //owner정보 추출
    const certificateId= req.params.id
    const ownerId = await certificateService.getCertificate(certificateId);
    util.hasPermission(ownerId.userId, currentUserInfo)

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const whenDate = req.body.whenDate ?? null;
    const toUpdate = { title, description, whenDate };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const changedCertificate = await certificateService.setCertificate(
      certificateId,
      toUpdate,
    );

    res.status(200).json(changedCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.delete("/certificates/:id", async function (req, res, next) {
  try {
    //현재 로그인한 사용자 정보추출
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });
    //owner정보 추출
    const certificateId= req.params.id
    const ownerId = await certificateService.getCertificate(certificateId);
    util.hasPermission(ownerId.userId, currentUserInfo)
    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await certificateService.deleteCertificate(
      certificateId,
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificatelist/:userId/:sortKey?",
  async function (req, res, next) {
    try {
      // 특정 사용자의 전체 수상 목록을 얻음
      const userId = req.params.userId;
      const sortKey = req.params.sortKey ;
      const certificateList = await certificateService.getCertificateList({
        userId,
        sortKey,
      });
      res.status(200).json(certificateList);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };

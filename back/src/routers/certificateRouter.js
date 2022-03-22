import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, title, whenDate, description } = req.body;

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
    const certificateId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const certificate = await certificateService.getCertificate({
      certificateId,
    });

    res.status(200).json(certificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const certificateId = req.params.id;
    const certificate = await certificateService.getCertificate({
      certificateId,
    });

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const whenDate = req.body.whenDate ?? null;

    const toUpdate = { title, description, whenDate };

    if (certificate.userId !== req.currentUserId) {
      throw new Error("자격증을 수정할 권한이 없습니다.");
    }

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const changedCertificate = await certificateService.setCertificate({
      certificateId,
      toUpdate,
    });

    res.status(200).json(changedCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.delete("/certificates/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const certificateId = req.params.id;
    const certificate = await certificateService.getCertificate({
      certificateId,
    });
    // 위 id를 이용하여 db에서 데이터 삭제하기
    if (certificate.userId !== req.currentUserId) {
      throw new Error("자격증을 삭제할 권한이 없습니다.");
    }

    const result = await certificateService.deleteCertificate({
      certificateId,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificatelist/:userId",
  async function (req, res, next) {
    try {
      // 특정 사용자의 전체 수상 목록을 얻음
      const userId = req.params.userId;
      const certificateList = await certificateService.getCertificateList({
        userId,
      });
      res.status(200).json(certificateList);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };

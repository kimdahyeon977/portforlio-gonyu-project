import { userAuthService } from "../services/userService";
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

import { util } from "../common/utils";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { userId, school, major, position, admissionDate } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      userId,
      school,
      major,
      position,
      admissionDate,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.get("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 찾기
    const education = await educationService.getEducation({ educationId });
    res.status(200).send(education);
  } catch (error) {
    next(error);
  }
});

educationRouter.put("/educations/:id", async function (req, res, next) {
  try {
    //현재 로그인한 사용자 정보추출
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });

    // URI로부터 수상 데이터 id를 추출함.
    const educationId = req.params.id;
    const permission = await educationService.getEducation({ educationId });
    util.noPermission(permission, currentUserInfo);

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;
    const admissionDate = req.body.admissionDate ?? null;
    const graduationDate = req.body.graduationDate ?? null;
    const toUpdate = { school, major, position, admissionDate, graduationDate };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const changedEducation = await educationService.setEducation({
      educationId,
      toUpdate,
    });

    res.status(200).send(changedEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete("/educations/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;
    const permission = await educationService.getEducation({ educationId });

    util.deletePermission(permission, req.currentUserId);

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await educationService.deleteEducation({ educationId });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

educationRouter.get(
  "/educationlist/:userId/:sortKey?", //{ admissionDate: "-1" }
  async function (req, res, next) {
    try {
      // 특정 사용자의 전체 수상 목록을 얻음
      const userId = req.params.userId;
      const sortKey = req.query;
      const educationList = await educationService.getEducationList({
        userId,
        sortKey,
      });
      res.status(200).send(educationList);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };

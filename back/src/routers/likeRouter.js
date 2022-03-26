import is from "@sindresorhus/is";
import { Router } from "express";
import { likeService } from "../services/likeService";
import { util } from "../common/utils";
import { userAuthService } from "../services/userService";
const likeRouter = Router();

likeRouter.post("/like/:userId", async function (req, res, next) {
  try {
    //role=recruter인지 확인
    const companyId = req.currentUserId; //adminId는 좋아요누른 사람 Id (즉, 현재 로그인 되어있는 사람)
    const { userId } = req.params; //userId는 게시글 id
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id: req.currentUserId,
    });

    util.isRecruter(currentUserInfo.role);
    //좋아요 추가
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const like = await likeService.findCompanyId({ userId, companyId });
    //좋아요 취소
    if (!like) {
      // add DB
      const likeAdd = await likeService.addLike({
        userId,
        companyId,
      });
      if (likeAdd.errorMessage) {
        throw new Error(likeAdd.errorMessage);
      }
      res.status(201).json(likeAdd);
    } else if (like) {
      const result = await likeService.companyUnlike({ userId, companyId });
      res.json("좋아요 취소");
    }
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/likelist/:companyId", async function (req, res, next) {
  //좋아요한 목록 받아오기
  try {
    //role=recruter인지 확인
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id: req.currentUserId,
    });
    util.isRecruter(currentUserInfo.role);
    const { companyId } = req.params;
    const likes = await likeService.getLikeList({ companyId });
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/likecount/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const counts = await likeService.likeCount({ userId });

    res.status(200).json(counts);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };

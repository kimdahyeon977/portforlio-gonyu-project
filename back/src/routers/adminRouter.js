import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { adminservice } from "../services/adminService";

const adminAuthRouter = Router();

adminAuthRouter.post("/admin/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newAdmin = await adminservice.addAdmin({
      name,
      email,
      password,
    });

    if (newAdmin.errorMessage) {
      throw new Error(newAdmin.errorMessage);
    }

    res.status(201).json(newAdmin);
  } catch (error) {
    next(error);
  }
});

adminAuthRouter.post("/admin/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const admin = await adminservice.getAdmin({ email, password });

    if (admin.errorMessage) {
      throw new Error(admin.errorMessage);
    }
    res.status(200).send(admin);
  } catch (error) {
    next(error);
  }
});

adminAuthRouter.get(
  "/adminlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await adminservice.getAdmins();

      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

adminAuthRouter.get(
  "/admin/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const admin_id = req.currentUserId;
      const currentUserInfo = await adminservice.getAdminInfo({
        admin_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

adminAuthRouter.put(
  "/admin/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const admin_id = req.params.id;
      const permission = await adminservice.getAdmin({admin_id});
      util.noPermission(permission.id, req.currentUserId)
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedadmin = await adminservice.setUser({ admin_id, toUpdate });

      if (updatedadmin.errorMessage) {
        throw new Error(updatedadmin.errorMessage);
      }

      res.status(200).json(updatedadmin);
    } catch (error) {
      next(error);
    }
  }
);

adminAuthRouter.get(
  "/admin/:id",
  login_required,
  async function (req, res, next) {
    try {
      const admin_id = req.params.id;
      const currentUserInfo = await adminservice.getAdminInfo({ admin_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);
adminAuthRouter.delete("/admin/:id", 
async (req, res, next) => {
  try{
    const {admin_id} = req.params
    const permission = await adminservice.getAdmin({admin_id});
    util.noPermission(permission.id, req.currentUserId)
    const deletedAdmin= await adminservice.delete({ admin_id });
    if (deletedAdmin.errorMessage) {
      throw new Error(deletedAdmin.errorMessage);
    }

    res.send("ok")
  }catch (error){
    next(error);
  }
});

export { adminAuthRouter };



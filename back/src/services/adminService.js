import { Admin } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class adminAuthService {
    async addAdmin({ name, email, password }) {
      // 이메일 중복 확인
      const user = await Admin.findByEmail({ email });
      if (user) {
        const errorMessage =
          "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
        return { errorMessage };
      }
  
      // 비밀번호 해쉬화
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // id 는 유니크 값 부여
      const id = uuidv4();
      const newUser = { id, name, email, password: hashedPassword };
  
      // db에 저장
      const createdNewUser = await Admin.create({ newUser });
      createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
  
      return createdNewUser;
    }  

  async getAdmin({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const admin = await Admin.findByEmail({ email }); //이메일로 admin찾기
    if (!admin) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = admin.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ admin_id: admin.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = admin.id;
    const name = admin.name;
    const description = admin.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  async getAdmins() {
    const admins = await Admin.findAll();
    return admins;
  }

  async setAdmin({ admin_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인 //admin_id로 찾기
    let admin = await Admin.findById({ admin_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!admin) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      admin = await Admin.update({ admin_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      admin = await Admin.update({ admin_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = toUpdate.password;
      admin = await Admin.update({ admin_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      admin = await Admin.update({ admin_id, fieldToUpdate, newValue });
    }

    return admin;
  }

  async getAdminInfo({ admin_id }) {
    const admin = await Admin.findById({ admin_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!admin) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return admin;
  }
  async delete({ id }) {//삭제
    // 우선 삭제할 projectid 의 플젝이 db에 존재하는지 여부 확인
    let adminTodelete = await Admin.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!adminTodelete) {
      const errorMessage =
        "삭제할 관리자가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const admin = await Admin.deleteById({id})
    return admin;
  };
}
let adminservice=new adminAuthService();
export { adminservice };


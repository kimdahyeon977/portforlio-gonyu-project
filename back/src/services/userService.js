import { USER } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class UserAuthService {
  async addUser({ name, email, password, role }) {
    // 이메일 중복 확인
    const user = await USER.findByEmail({ email });
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword, role };

    // db에 저장
    const createdNewUser = await USER.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await USER.findByEmail({ email });
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const role = user.role;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      role,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  async getUsers({ sortKey }) {
    const users = await USER.findAll({ sortKey });
    return users;
  }

  async setUser({ userId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await USER.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = toUpdate.password;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }
    if (toUpdate.role) {
      const fieldToUpdate = "role";
      const newValue = toUpdate.role;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.role) {
      const fieldToUpdate = "role";
      const newValue = toUpdate.role;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await USER.update({ userId, fieldToUpdate, newValue });
    }

    return user;
  }

  async getUserInfo({ userId }) {
    const user = await USER.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  async deleteUser({ userId }) {
    const isDataDeleted = await USER.deleteById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      throw new Error(
        "해당 id를 가진 자격증 사용자는 없습니다. 다시 한 번 확인해 주세요. 데이터가 지워지지 않았습니다."
      );
    }

    return isDataDeleted;
  }
}
const userAuthService = new UserAuthService();
export { userAuthService };

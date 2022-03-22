// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationService {
  async addEducation({ userId, school, major, position }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newEducation = { id, userId, school, major, position };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  async getEducation({ educationId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    try {
      const education = await Education.findById({ educationId });
      if (!education) {
        throw new Error(
          "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요."
        );
      }

      return education;
    } catch (error) {
      next(error);
    }
  }

  async getEducationList({ userId }) {
    const educations = await Education.findByUserId({ userId });
    return educations;
  }

  async setEducation({ educationId, toUpdate }) {
    try {
      let education = await Education.findById({ educationId });

      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!education) {
        throw new Error(
          "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요."
        );
      }

      if (toUpdate.school) {
        const fieldToUpdate = "school";
        const newValue = toUpdate.school;
        education = await Education.update({
          educationId,
          fieldToUpdate,
          newValue,
        });
      }

      if (toUpdate.major) {
        const fieldToUpdate = "major";
        const newValue = toUpdate.major;
        education = await Education.update({
          educationId,
          fieldToUpdate,
          newValue,
        });
      }

      if (toUpdate.position) {
        const fieldToUpdate = "position";
        const newValue = toUpdate.position;
        education = await Education.update({
          educationId,
          fieldToUpdate,
          newValue,
        });
      }

      return education;
    } catch (error) {
      next(error);
    }
  }

  async deleteEducation({ educationId }) {
    try {
      const isDataDeleted = await Education.deleteById({ educationId });

      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!isDataDeleted) {
        throw new Error(
          "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요. 데이터가 지워지지 않았습니다."
        );
      }

      return isDataDeleted;
    } catch (error) {
      next(error);
    }
  }
}

const educationService = new EducationService();
export { educationService };

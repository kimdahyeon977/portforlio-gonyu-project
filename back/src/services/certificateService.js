// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  async addCertificate({ userId, title, description, whenDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newCertificate = { id, userId, title, description, whenDate };
    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  }

  async getCertificate({ certificateId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    try {
      const certificate = await Certificate.findById({ certificateId });
      if (!certificate) {
        throw new Error(
          "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요."
        );
      }

      return certificate;
    } catch (error) {
      next(error);
    }
  }

  async getCertificateList({ userId }) {
    const certificates = await Certificate.findByUserId({ userId });
    return certificates;
  }

  async setCertificate({ certificateId, toUpdate }) {
    try {
      let certificate = await Certificate.findById({ certificateId });

      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!certificate) {
        throw new Error(
          "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요."
        );
      }

      if (toUpdate.title) {
        const fieldToUpdate = "title";
        const newValue = toUpdate.title;
        certificate = await Certificate.update({
          certificateId,
          fieldToUpdate,
          newValue,
        });
      }

      if (toUpdate.description) {
        const fieldToUpdate = "description";
        const newValue = toUpdate.description;
        certificate = await Certificate.update({
          certificateId,
          fieldToUpdate,
          newValue,
        });
      }

      if (toUpdate.whenDate) {
        const fieldToUpdate = "whenDate";
        const newValue = toUpdate.whenDate;
        certificate = await Certificate.update({
          certificateId,
          fieldToUpdate,
          newValue,
        });
      }

      return certificate;
    } catch (error) {
      next(error);
    }
  }

  async deleteCertificate({ certificateId }) {
    try {
      const isDataDeleted = await Certificate.deleteById({ certificateId });

      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!isDataDeleted) {
        throw new Error(
          "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요. 데이터가 지워지지 않았습니다."
        );
      }

      return isDataDeleted;
    } catch (error) {
      next(error);
    }
  }
}

const certificateService = new CertificateService();
export { certificateService };

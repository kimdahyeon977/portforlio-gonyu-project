// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  async addCertificate({ userId, title, description, whenDate }) {
    // id로 유니크 값 사용
    const id = uuidv4();

    // db에 저장
    const newCertificate = { id, userId, title, description, whenDate };
    const createdNewCertificate = await certificate.create({ newCertificate });

    return createdNewCertificate;
  }

  async getCertificate({ certificateId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const certificate = await certificate.findById({ certificateId });
    if (!certificate) {
      throw new Error(
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return certificate;
  }

  async getCertificateList({ userId, sortKey }) {
    const certificates = await certificate.findByUserId({ userId, sortKey });
    return certificates;
  }

  async setCertificate({ certificateId, toUpdate }) {
    let certificate = await certificate.findById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      throw new Error(
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.whenDate) {
      const fieldToUpdate = "whenDate";
      const newValue = toUpdate.whenDate;
      certificate = await certificate.update({
        certificateId,
        fieldToUpdate,
        newValue,
      });
    }

    return certificate;
  }

  async deleteCertificate({ certificateId }) {
    const isDataDeleted = await certificate.deleteById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      throw new Error(
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요. 데이터가 지워지지 않았습니다."
      );
    }

    return isDataDeleted;
  }
}

const certificateService = new CertificateService();
export { certificateService };

import { CertificateModel } from "../schemas/certificate";

class Certificate {
  async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  async findById({ certificateId }) {
    const certificate = await CertificateModel.findOne({ id: certificateId });
    return certificate;
  }

  async findByUserId({ userId, sortKey }) {
    const certificates = await CertificateModel.find({ userId }).sort(
      sortKey ? sortKey : { whenDate: "-1" }
    ); //디폴트는 자격증 취득일이 최신순으로 정렬, 내림차순;
    return certificates;
  }

  async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  async deleteById({ certificateId }) {
    const deleteResult = await CertificateModel.deleteOne({
      id: certificateId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

const certificate = new Certificate();
export { certificate };

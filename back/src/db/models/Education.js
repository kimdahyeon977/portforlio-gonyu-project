import { EducationModel } from "../schemas/education";

class Education {
  async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }
  async findById({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }

  async findByUserId({ userId, sortKey }) {
    const educations = await EducationModel.find({ userId }).sort(
      sortKey ? sortKey : { admissionDate: "-1" }
    ); //디폴트는 입학일이 최신순으로 정렬, 내림차순
    return educations;
  }

  async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  async deleteById({ educationId }) {
    const deleteResult = await EducationModel.deleteOne({ id: educationId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

const education = new Education();
export { education };

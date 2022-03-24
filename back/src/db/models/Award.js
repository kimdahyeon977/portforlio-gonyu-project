import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ award_Id }) {
    const award = await AwardModel.findOne({ id: award_Id });
    return award;
  }

  static async findByUserId({ userId, sortKey }) {
    const educations = await EducationModel.find({ userId }).sort(
      sortKey ? sortKey : { admissionDate: "-1" }
    ); //디폴트는 입학일이 최신순으로 정렬, 내림차순
    return educations;
  }

  static async update({ award_Id, fieldToUpdate, newValue }) {
    const filter = { id: award_Id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async deleteByid({ award_Id }) {
    const deleteAward = await AwardModel.deleteOne({ id: award_Id });
    return deleteAward;
  }
}
export { Award };
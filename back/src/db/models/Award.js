import { AwardModel } from "../schemas/award";

class Award {
  async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  async findById({ awardId }) {
    const award = await AwardModel.findOne({ id: awardId });
    return award;
  }

  static async findByUserId({ userId, sortKey }) {
    const educations = await EducationModel.find({ userId }).sort(
      sortKey ? sortKey : { admissionDate: "-1" }
    ); //디폴트는 입학일이 최신순으로 정렬, 내림차순
    return educations;
  }

  async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  async deleteByid({ awardId }) {
    const deleteAward = await AwardModel.deleteOne({ id: awardId });
    return deleteAward;
  }
}
const award =  new Award()
export { award };

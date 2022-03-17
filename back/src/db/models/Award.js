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

  static async findByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
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

  static async deleteById({ award_Id }) {
    const deleteAward = await AwardModel.deleteOne({ _id: award_Id });
    const awardDeleted = deleteAward.deletedCount === 1;
    return awardDeleted;
  }
}
export { Award };
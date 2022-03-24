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

  async findByUserId({ userId }) {
    const awards = await AwardModel.find({ userId });
    return awards;
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

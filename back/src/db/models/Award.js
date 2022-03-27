import { AwardModel } from "../schemas/award";

class Award {
  async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  // async findByUserId({ userId, sortKey }) {
    // const educations = await EducationModel.find({ userId }).sort(
    //   sortKey ? sortKey : { admissionDate: "-1" }
    // ); //디폴트는 입학일이 최신순으로 정렬, 내림차순
  //   return educations;
  // }

  async findById( {id} ) {
    const award = await AwardModel.findOne( id);
    return award;
  }

  async findByUserId({ userId,sortKey}) {
    const awards = await AwardModel.find({ userId }).sort(
      sortKey ? sortKey : { admissionDate: "-1" }
    );
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

  async deleteByid(id) {
    const deleteAward = await AwardModel.deleteOne(id);
    return deleteAward;
  }
}
const award =  new Award()
export { award };

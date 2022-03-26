import { UserModel } from "../schemas/user";

class User {
  async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId }).sort(
      sortKey ? sortKey : { name: "1" }
    );
    return user;
  }

  async findAll({ sortKey }) {
    const users = await UserModel.find({}).sort(
      sortKey ? sortKey : { createdAt: "-1" }
    ); //디폴트는 계정 생성일이 최신순으로 정렬, 내림차순;
    return users;
  }

  async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
  async deleteById({ userId }) {
    const deleteResult = await UserModel.deleteOne({
      id: userId,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

const USER = new User();
export { USER };

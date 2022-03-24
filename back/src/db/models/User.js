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

  async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

const user = new User();
export { user };

import { AdminModel } from "../schemas/admin";

class Admin{
  async create({ newAdmin }) {
    const createdNewUser = await AdminModel.create(newAdmin);
    return createdNewUser;
  }

  async findAll() {
    const users = await AdminModel.find({});
    return users;
  }
  async findById({ admin_id }) {
    const user = await AdminModel.findOne({ id: admin_id });
    return user;
  }
  async findByEmail({ email }) {
    const user = await AdminModel.findOne({ email: email });
    return user;
  }

  async update({ admin_id, fieldToUpdate, newValue }) {
    const filter = { id: admin_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAdmin = await AdminModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAdmin;
  }
  async deleteById({id}){ //삭제
    const deletedProject= await ProjectModel.find({id:id})
    return deletedProject
  }
}
const Admin=new Admin();
export { Admin };


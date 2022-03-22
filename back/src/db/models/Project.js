import { ProjectModel } from "../schemas/project";
class Project {
  async create({ newProject }) {//추가
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  async findById({ id }) {//해당 플젝 찾기
    const project = await ProjectModel.findOne({id: id });
    return project;
  }

  async update({ id, fieldToUpdate, newValue }) { //수정
    const filter = { id: id }; 
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  
  async findByUserId({ userId }) { //해당 유저찾기
    const projects = await ProjectModel.find({ user_id: userId });
    return projects;
  }
  async deleteById({id}){ //삭제
    const deletedProject= await ProjectModel.find({id:id})
    return deletedProject
  }
}
//싱글톤 사용해보기
const project=new Project();
export { project };



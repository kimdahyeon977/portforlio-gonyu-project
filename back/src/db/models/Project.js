import { ProjectModel } from "../schemas/project";
class Project {
  async create({ newProject }) {//추가
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  async findById({ projectId }) { //projectId로 플젝 찾기
    const project = await ProjectModel.findOne({ id: projectId });
    return project;
  }
  
  async findByUserId({ user_id }) {
    const projects = await ProjectModel.findOne({ id: user_id });
    return projects;
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
  async deleteById({id}){ //삭제
    const deletedProject= await ProjectModel.deleteOne({id: id})
    return deletedProject
  }
}
//싱글톤 사용해보기
let project=new Project();
export { project };

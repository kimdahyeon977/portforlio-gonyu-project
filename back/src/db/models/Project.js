import { ProjectModel } from "../schemas/project";

class Project {
  async create({ newProject }) {//추가
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  async findById({ projectId }) { //projectId로 플젝 찾기
    const project = await ProjectModel.findOne({ projectId: projectId });
    return project;
  }
  
  async findAll({userId}) {//userId의 플젝 모두 보기 
    const projects = await ProjectModel.find({userId: userId});
    return projects;
  }
  
  async update({ projectId, fieldToUpdate, newValue }) { //수정
    const filter = { projectId: projectId }; 
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }
  async deleteById({projectId}){ //삭제
    const deletedProject= await ProjectModel.deleteOne({projectId: projectId})
    return deletedProject
  }
}
//싱글톤 사용해보기
let project=new Project();
export { project };

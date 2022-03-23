import { ProjectModel } from "../schemas/project";
class Project {
  async create({ newProject }) {//추가
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  async findById({ projectId }) {//해당 플젝 찾기
    const project = await ProjectModel.findOne({id : projectId });
    return project;
  }

  async update({ projectId, fieldToUpdate, newValue }) { //수정
    const filter = { id: projectId }; 
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
    const projects = await ProjectModel.find({ userId }).sort({fromDate:-1});
    return projects;
  }
  async deleteById({projectId}){ //삭제
    const deletedProject= await ProjectModel.find({id : projectId})
    return deletedProject
  }
}
//싱글톤 사용해보기
const project=new Project();
export { project };



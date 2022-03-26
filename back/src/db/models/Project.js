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
  async findAll() { //관리자모드에서 플젝 모두 모아보기
    const projects = await ProjectModel.find({});
    return projects;
  }
  
  async findByUserId({ userId, sortKey }) {
    const projects = await ProjectModel.find({ userId }).sort(
      sortKey ? sortKey : { fromDate: "-1" }
    ); //디폴트는 입학일이 최신순으로 정렬, 내림차순
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



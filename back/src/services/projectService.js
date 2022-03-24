import { project as Project } from "../db/models/Project"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { util } from "../common/utils";
class projectService {
  async addProject({ userId,title, task, fromDate, toDate }) { //추가
    // db에 저장
    const newProject = {  userId, title, task, fromDate, toDate }; 
    const createdNewProject = await Project.create({ newProject });
    if(!util.isvalid(fromDate)|| !util.isvalid(toDate)){ //isvalid func에서 return값이 없으면
      throw new Error("날짜의 형식을 올바르게 입력해주세요 ex) 2017-01-01")
    }
    if( !userId || !title || !description || !fromDate || !toDate){
    throw new Error("필수입력값을 모두 입력해주세요.")
    }
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }
  async getProject({projectId}){ //projectId로 특정 project만 조회
    const project = await Project.findById({projectId});
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if(!project) {
      throw new Error("해당 프로젝트가 없습니다. 다시 한 번 확인해 주세요.");
    }
    return project;
    if(project){

    }
}
  async getUserInfo({ userId }) {
    const projects = await Project.findByUserId({ userId })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projects) {
      throw new Error("해당 유저는 조회가능내역이 없습니다. 다시 한 번 확인해 주세요.")
    }

    return projects;
  }
  async getProjects() { //모든 플젝모아보기
    const projects = await Project.findAll();
    return projects;
  }
  

  async setProject({ projectId, toUpdate }) {//수정 
    // 우선 해당 projectid 의 플젝이 db에 존재하는지 여부 확인
    let project = await Project.findById({ projectId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      throw new Error("해당 프로젝트를 찾을 수 없습니다. 다시 한번 확인해주세요.")
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.task) {
      const fieldToUpdate = "task";
      const newValue = toUpdate.task;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.fromDate) {
      const fieldToUpdate = "fromDate";
      const newValue = toUpdate.fromDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }
    if (toUpdate.toDate) {
      const fieldToUpdate = "toDate";
      const newValue = toUpdate.toDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }
    if(!util.isvalid(toUpdate.fromDate)|| !util.isvalid(toUpdate.toDate)){ //isvalid func에서 return값이 없으면
      throw new Error("날짜의 형식을 올바르게 입력해주세요 ex) 2017-01-01")
    }

    return project;
  }

  async deleteProject({ projectId }) {//삭제
    // 우선 삭제할 projectid 의 플젝이 db에 존재하는지 여부 확인
    let projectTodelete = await Project.findById({ projectId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projectTodelete) {
      throw new Error("삭제할 프로젝트가 없습니다. 다시 한 번 확인해 주세요.");
    }
    const project = await Project.deleteById({projectId})
    return project;
  };
}
//싱글톤 사용해보기
let projectservice=new projectService();
export { projectservice };


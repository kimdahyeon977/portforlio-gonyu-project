import { project as Project } from "../db/models/Project"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
class projectService {
  async add({ userId,title, task, from_date, to_date }) { //추가
    const newProject = {  userId, title, task, from_date, to_date }; 

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }
  async find({id}){ //projectId로 특정 project만 조회
    const project = await Project.findById({id});
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return project;
  }
  
  async getUserInfo({ userId }) {
    const projects = await Project.findByUserId({ userId }).sort({to_date: -1})

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projects) {
      const errorMessage =
        "해당 유저는 조회가능내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return projects;
  }
  

  async set({ id, toUpdate }) {//수정 
    // 우선 해당 projectid 의 플젝이 db에 존재하는지 여부 확인
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage =
        "해당 프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.task) {
      const fieldToUpdate = "task";
      const newValue = toUpdate.task;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.date) {
      const fieldToUpdate = "date";
      const newValue = toUpdate.date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return project;
  }

  async delete({ id }) {//삭제
    // 우선 삭제할 projectid 의 플젝이 db에 존재하는지 여부 확인
    let projectTodelete = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!projectTodelete) {
      const errorMessage =
        "삭제할 프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const project = await Project.deleteById({id})
    return project;
  };
}
//싱글톤 사용해보기
let projectservice=new projectService();
export { projectservice };


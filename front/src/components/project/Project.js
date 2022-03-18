import React, { useState } from "react";
import ProjectEdit from "./ProjectEdit";
import ProjectCard from "./ProjectCard";

function Project({ project, setProjectList, isEditable }) {
  const [ isEdit, setEditState ] = useState(false)
  return (
    <>
      {
        isEdit ? (
            <ProjectEdit
                curProject={project}
                setEditState={setEditState}
                setProjectList={setProjectList}
            />
        ) : (
            <ProjectCard
                project={project}
                setEditState={setEditState}
                isEditable={isEditable}
            />
        )
      }
    </>
  );
}

export default Project;
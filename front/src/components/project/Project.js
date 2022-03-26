import React, { useState } from "react";
import ProjectEdit from "./ProjectEdit";
import ProjectCard from "./ProjectCard";

function Project({ curProject, setProjectList, isEditable }) {
  const [ isEditting, setIsEditting ] = useState(false)
  return (
    <>
      {
        isEditting ? (
            <ProjectEdit
                curProject={curProject}
                setIsEditting={setIsEditting}
                setProjectList={setProjectList}
            />
        ) : (
            <ProjectCard
                curProject={curProject}
                setIsEditting={setIsEditting}
                isEditable={isEditable}
            />
        )
      }
    </>
  );
}

export default Project;
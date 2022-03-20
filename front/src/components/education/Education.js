import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducationList, isEditable }) {
  const [ isEditing, setIsEditing ] = useState(false)
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          educationLevel={education}
          setIsEditing={setIsEditing}
          setEducationList={setEducationList}
        />
      ) : (
        <EducationCard
          education={education}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Education;
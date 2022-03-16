import React, { useState } from "react";

function Education() {
  const [ isEditing, setIsEditing ] = useState(false)
  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setIsEditing={setIsEditing}
          setEducations={setEducations}
        />
      ) : (
        <EducationCard
          education={education}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default Education;
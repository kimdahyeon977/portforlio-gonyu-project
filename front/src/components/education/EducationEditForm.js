import React, { useState } from "react";
import * as Api from "../../api";

function EducationEditForm({ currentEducation, setIsEditing, setEducationList }) {
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);

  const handleSubmit= async (e) => {
    e.preventDefault();

    const user_id = currentEducation.user_id;

    // 학력 수정
    const res = await Api.put(`educations/${currentEducation.id}`, {
      user_id,
      school,
      major,
      position,
    });

    const updatedEducationList = res.data;
    setEducationList(updatedEducationList);
    setIsEditing(false);
  }
}
export default EducationEditForm;
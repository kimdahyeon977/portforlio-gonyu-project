import React, { useState } from "react";
import * as Api from "../../api";

function EducationAdd({ portfolioOwnerId, setIsAdding, setEducationList }) {

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;

    await Api.post("education/create", {
      user_id,
      school,
      major,
      position,
    });
  }
}

export default EducationAdd;
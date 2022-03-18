import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Education from "./Education";
import * as Api from "../../api";

function EducationLevel({ portfolioOwnerId, isEditable}) {

  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducationList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
        {educationList.map((education) => (
          <Education
            key={education.id}
            education={education}
            isEditable={isEditable}
            setEducationList={setEducationList}
            />
        ))}
      </Card.Body>
    </Card>
  );
}

export default EducationLevel;
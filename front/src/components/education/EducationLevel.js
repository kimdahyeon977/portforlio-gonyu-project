import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Education from "./Education";
import * as Api from "../../api";
import EducationAdd from "./EducationAdd";

function EducationLevel({ portfolioOwnerId, isEditable}) {

  const [educationList, setEducationList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
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

        {isEditable && (
          <Row className="text-center">
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <EducationAdd
            portfolioOwnerId={portfolioOwnerId}
            setEducationList={setEducationList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default EducationLevel;
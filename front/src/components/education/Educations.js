import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Education from "./Education";
import * as Api from "../../api";
import EducationAddForm from "./EducationAddForm";

function Educations({ portfolioOwnerId, isEditable}) {

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
          <React.Fragment key={education.id}>
            <Education
              education={education}
              isEditable={isEditable}
              setEducationList={setEducationList}
              />
              <div className="mb-2"></div>
          </React.Fragment>
          ))}

        {isEditable && (
          <Row className="text-center">
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <EducationAddForm
            portfolioOwnerId={portfolioOwnerId}
            setEducationList={setEducationList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Educations;
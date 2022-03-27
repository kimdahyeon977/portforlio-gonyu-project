import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Education from "./Education";
import * as Api from "../../api";
import EducationAddForm from "./EducationAddForm";
import {DarkModeContext} from "../../App"

function Educations({ portfolioOwnerId, isEditable}) {
  const {isDarkMode} = useContext(DarkModeContext);

  const [educationList, setEducationList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducationList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card
      style={{backgroundColor : isDarkMode ? "#222":"#FFF", color : isDarkMode ? "#FFF":"#000"}}
    >
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

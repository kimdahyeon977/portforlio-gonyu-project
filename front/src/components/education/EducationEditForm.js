import React, { useState } from "react";
import * as Api from "../../api";
import { Button, Form, Col, Row } from "react-bootstrap";

function EducationEditForm({ education, setIsEditing, setEducationList }) {
  const [school, setSchool] = useState(education.school);
  const [major, setMajor] = useState(education.major);
  const [position, setPosition] = useState(education.position);

  const handleSubmit= async (e) => {
    e.preventDefault();

    const editedEducation = {
      ...education,
      school,
      major,
      position,
    };

    // 학력 수정
    try {
      await Api.put(`educations/${education.id}`, editedEducation);
      setEducationList((prev) =>
        prev.map((education) =>
          education.id === editedEducation.id ? editedEducation : education
        )
      );
      setIsEditing(false);
    } catch (err) {
      console.log("항목 수정에 실패하였습니다.", err);
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="editSchoolName">
        <Form.Label>학교 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="editMajor">
        <Form.Label>전공</Form.Label>
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          />
      </Form.Group>

    <div key={'inline-radio'} className="mb-3">
      {['재학 중', '학사 졸업', '석사 졸업' , '박사 졸업'].map(
        (option, id) => (
        <Form.Check
          inline
          key={option}
          value={option}
          label={option}
          name={'position'}
          type={'radio'}
          id={`inline-radio-${id+1}`}
          checked={position === option}
          onChange={() => setPosition(option)}
        />
          )
        )}
    </div>

  <Row>
    <Col>
      <Button variant="primary" type="submit" className="me-3">
        확인
      </Button>
      <Button variant="secondary" onClick={() => setIsEditing(false)}>
        취소
      </Button>
    </Col>
    </Row>
</Form>
  )
  };

export default EducationEditForm;

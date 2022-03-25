import React, { useState } from "react";
import * as Api from "../../api";
import { Button, Form, Col, Row } from "react-bootstrap";

function EducationEditForm({ eudcationLevel, setIsEditing, setEducationList }) {
  const [school, setSchool] = useState(eudcationLevel.school);
  const [major, setMajor] = useState(eudcationLevel.major);
  const [position, setPosition] = useState(eudcationLevel.position);

  const handleSubmit= async (e) => {
    e.preventDefault();

    const user_id = eudcationLevel.user_id;

    // 학력 수정
    try {
      await Api.put(`educations/${eudcationLevel.id}`, {
        user_id,
        school,
        major,
        position,
      })
    } catch (err) {
      console.log("항목 수정에 실패하였습니다.", err);
    }

    try {
      const res = await Api.get("educationlist", user_id);
      setEducationList(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log("항목 갖고오기에 실패하였습니다.", err);
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

  {['radio'].map((type) => (
    <div key={`inline-${type}`} className="mb-3">
      <Form.Check
        inline
        value="재학 중"  // 제어 컴포넌트에서 value prop 을 지정하면 사용자가 input 의 value 를 변경할 수 없도록함.
        label="재학 중"
        name="position"
        type={type}
        id={`inline-${type}-1`}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        value="학사 졸업"
        label="학사 졸업"
        name="position"
        type={type}
        id={`inline-${type}-2`}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        value="석사 졸업"
        label="석사 졸업"
        name="position"
        type={type}
        id={`inline-${type}-3`}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        value="박사 졸업"
        label="박사 졸업"
        name="position"
        type={type}
        id={`inline-${type}-4`}
        onChange={(e) => setPosition(e.target.value)}
      />
    </div>
  ))}

  <Row>
    <Col>
      <Button variant="primary" type="submit" className="me-3">
        확인
      </Button>
      <Button variant="secondary" type="submit" onClick={() => setIsEditing(false)}>
        취소
      </Button>
    </Col>
    </Row>
</Form>
  )
  };

export default EducationEditForm;
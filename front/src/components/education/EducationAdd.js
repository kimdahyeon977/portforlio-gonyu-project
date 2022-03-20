import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Button, Col, Row } from "react-bootstrap";

function EducationAdd({ portfolioOwnerId, setIsAdding, setEducationList }) {

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  //입력되는 값으로 text 변경시키는 함수
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(e.target.value);
    const user_id = portfolioOwnerId;

    try {
      await Api.post("education/create", {
        user_id,
        school,
        major,
        position,
      })
    } catch (err) {
      console.log("항목 추가에 실패하였습니다.", err);
    }

    try {
      const res = await Api.get("educationlist", user_id);
      setEducationList(res.data);
      setIsAdding(false);
    } catch (err) {
      console.log("항목 갖고오기에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="addSchoolName">
        <Form.Label>학교 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="addMajor">
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
      <Button variant="secondary" onClick={() => setIsAdding(false)}>
        취소
      </Button>
    </Col>
    </Row>
</Form>
  )
}

export default EducationAdd;
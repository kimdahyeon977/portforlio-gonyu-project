import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Button, Col, Row } from "react-bootstrap";

function EducationAddForm({ portfolioOwnerId, setIsAdding, setEducationList }) {

  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  //입력되는 값으로 text 변경시키는 함수
  const handleSubmit = async(e) => {
    e.preventDefault();

    const userId = portfolioOwnerId;

    try {
      await Api.post("education/create", {
        userId,
        school,
        major,
        position,
      })
    } catch (err) {
      console.log("항목 추가에 실패하였습니다.", err);
    }

    try {
      const res = await Api.get("educationlist", userId);
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

    <div key={'inline-radio'} className="mb-3">
      {['재학 중', '학사 졸업', '석사 졸업', '박사 졸업'].map(
        (option, id) => (
      <Form.Check
        inline
        value={option}  // 제어 컴포넌트에서 value prop 을 지정하면 사용자가 input 의 value 를 변경할 수 없도록함.
        label={option}
        name={'position'}
        type={'radio'}
        id={`inline-radio-${id + 1}`}
        onChange={() => setPosition(option)}
        key={option}
      />
      )
      )}
    </div>

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

export default EducationAddForm;

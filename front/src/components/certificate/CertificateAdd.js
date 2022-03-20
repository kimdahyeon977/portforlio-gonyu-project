import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

function CertificateAdd({ portfolioOwnerId, setIsAdding, setCertificateList }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [whenDate, setWhenDate] = useState(new Date());

  //입력되는 값으로 text 변경시키는 함수
  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
    const when_date = moment().format("YYYY-MM-DD").split(" ");

    console.log(whenDate);
    console.log(when_date);

    try {
      await Api.post("certificate/create", {
        user_id,
        title,
        description,
        when_date,
      })
    } catch (err) {
      console.log("날짜 추가에 실패하였습니다.", err);
    }
    console.log(title);
    console.log(e.target.value);

    try {
      const res = await Api.get("certificatelist", user_id);
      setCertificateList(res.data);
      setIsAdding(false);
    } catch (err) {
      console.log("날짜 출력에 실패하였습니다.", err);
  };
}

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="addCertificateName">
        <Form.Label>자격증 제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="addCertificate">
        <Form.Label>상세설명</Form.Label>
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </Form.Group>

      <DatePicker
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
      />
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

export default CertificateAdd;
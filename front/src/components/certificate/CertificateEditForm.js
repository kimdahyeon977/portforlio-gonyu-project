import React, { useState } from "react";
import * as Api from "../../api";
import { Form, Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

function CertificateEditForm({ currentCertificate, setIsEditing, setCertificateList }) {

  const [title, setTitle] = useState(currentCertificate.title);
  const [description, setDescription] = useState( currentCertificate.description);
  const [whenDate, setWhenDate] = useState( new Date(currentCertificate.when_date));

  //입력되는 값으로 text 변경시키는 함수
  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = currentCertificate.user_id;
    const when_date = moment().format("YYYY-MM-DD").split(" ");

    try {
      await Api.put(`certificates/${currentCertificate.id}`, {
        user_id,
        title,
        description,
        when_date,
      })
    } catch (err) {
      console.log("자격증 수정에 실패하였습니다.", err);
    }

    try {
      const res = await Api.get("certificatelist", user_id);
      setCertificateList(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log("자격증 가져오기에 실패하였습니다.", err);
  };
}

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="editCertificateTitle">
        <Form.Label>자격증 제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-3" controlId="editCertificate">
        <Form.Label>상세내역</Form.Label>
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        setWhencurte />
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
      <Button variant="secondary" onClick={() => setIsEditing(false)}>
        취소
      </Button>
    </Col>
    </Row>
</Form>
  )
};

export default CertificateEditForm;


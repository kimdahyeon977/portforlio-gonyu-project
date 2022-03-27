import React, { useState } from "react"
import {Row, Col, Form, Button} from "react-bootstrap"

import * as API from "../../api"
import DatePicker from "react-datepicker"

function ProjectInserting({ownerId, setProjectList, setIsInserting}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const submitHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const res = await API.post("project/create", {title,task,description, fromDate,toDate});
        setProjectList((prev) => [...prev, res.data]);
        setIsInserting(false);
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>프로젝트 제목</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    placeholder="프로젝트의 제목이 어떻게 되나요?"
                    onChange={(event) => setTitle(event.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>프로젝트 설명</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    placeholder="어떤 프로젝트였나요? 간단하게 설명해주세요."
                    onChange={(event) => setDescription(event.target.value)}
                >
                </Form.Control>
                <Row className="mt-2">
                    <Col>
                        <Form.Label>시작한 날짜</Form.Label>
                        <DatePicker
                            wrapperClassName="datePicker"
                            dateFormat={"MM/dd eee, yy"}
                            selected={fromDate}
                            onChange={(fromDate)=>setFromDate(fromDate)}
                        >
                        </DatePicker>
                    </Col>
                    <Col>
                        <Form.Label>끝난 날짜</Form.Label>
                        <DatePicker
                            wrapperClassName="datePicker"
                            dateFormat={"MM/dd eee, yy"}
                            selected={toDate}
                            onChange={(toDate)=>setToDate(toDate)}
                        >
                        </DatePicker>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Row className="mt-3">
                    <Col className="text-center">
                        <Button type="submit" variant="primary" className="me-3">내 삽질 기록 추가하기</Button>
                        <Button variant="danger" onClick={() => setIsInserting(false)} className="me-3">취소</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default ProjectInserting;

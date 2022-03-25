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

        const res = await API.get("projectlist", ownerId);
        setProjectList(res.data);
        setIsInserting(false);
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    value={title}
                    placeholder="프로젝트의 제목이 어떻게 되나요?"
                    onChange={(event) => setTitle(event.target.value)}
                >
                </Form.Control>
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
                        <Form.Label>시작한 날짜</Form.Label>
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
                <Row>
                    <Col className="text-center mt-3">
                        <Button type="submit" variant="primary">내 삽질 기록 추가하기</Button>
                        <Button variant="danger" onClick={() => setIsInserting(false)}>취소</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default ProjectInserting;

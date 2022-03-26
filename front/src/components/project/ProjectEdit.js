import React, { useState } from "react"
import {Button, Row, Col, Form} from "react-bootstrap"
import DatePicker from "react-datepicker"
import * as API from "../../api"

function ProjectEdit({curProject, setProjectList, setIsEditting}){
    const [title, setTitle] = useState(curProject.title);
    const [description, setDescription] = useState(curProject.description);
    const [fromDate, setFromDate] = useState(curProject.fromDate);
    const [toDate, setToDate] = useState(curProject.toDate);

    const submitHandler = async () => {
        const edittedProject = {
            ...curProject,
            title,
            description,
            fromDate,
            toDate,
        }

        await API.put(`project/${curProject.id}`, edittedProject);
        setProjectList((prev) => {
            const prevData = prev.filter((item) => item.id !== curProject.id)
            return [
                ...prevData,
                edittedProject,
            ]
        })
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
                <Row>
                    <Col className="text-center mt-3">
                        <Button type="submit" variant="primary">내 삽질 기록 추가하기</Button>
                        <Button variant="danger" onClick={() => setIsEditting(false)}>취소</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

export default ProjectEdit;

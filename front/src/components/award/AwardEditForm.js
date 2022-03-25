import { Button } from "react-bootstrap";
import React, {useState} from "react"
import { Col, Form } from "react-bootstrap";
import * as API from '../../api'

function AwardEditForm({setAwards, curAward, setIsEditing}){
    const [title, setTitle] = useState(curAward.title);
    const [description, setDescription] = useState(curAward.description)

    const submitHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const edittedAward = {
            ...curAward,
            title,
            description,
        }
        try {
            await API.put(`awards/${curAward.id}`, edittedAward);
            setAwards((prev) => {
                const edittedList = prev.filter(item => item.id !== curAward.id)
                return [
                    ...edittedList,
                    edittedAward,
                ]
            })
            setIsEditing(false);

        }catch(error){
            console.error(error);
        }
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                    type="text"
                    onChange={(event) => {setTitle(event.target.value)}}
                    value={title}
                    placeholder="어떤 상을 받았나요?"
                />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Control
                    type="text"
                    onChange={(event) => {setDescription(event.target.value)}}
                    value={description}
                    placeholder="받으신 상에 대해 소개해주세요"
                />
            </Form.Group>
            <Form.Group>
                <Col className="text-center">
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-2 mr-3"
                    >
                        반영하기
                    </Button>
                    <Button
                        variant="danger"
                        className="mt-2 mr-3"
                        onClick={(event) => {setIsEditing(false)}}
                    >
                        취소하기
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default AwardEditForm;

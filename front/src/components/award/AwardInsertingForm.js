import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as API from "../../api"

function AwardInsertingForm({setIsInserting, ownerId, setAwards}){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const submitHandler = async(event) => {
        event.preventDefault();
        event.stopPropagation();

        await API.post("award/create", {
            user_id : ownerId,
            title,
            description,
        })

        const res = await API.get("awardlist", ownerId)
        setAwards(res.data)
        setIsInserting(false)
    }

    return <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicTitle" className="mb-3">
                    <Form.Label>수상한 상의 이름</Form.Label>
                    <Form.Control 
                        type="text"
                        value={title} 
                        placeholder="받으신 상의 이름이 어떻게 되나요?" 
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    
                </Form.Group>

                <Form.Group controlId="formBasicDescription" className="mb-3">
                    <Form.Label>수상한 상에 대한 설명</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={description} 
                        placeholder="뭐에 대한 상인가요?"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="text-center">
                    <Col>
                        <Button className="me-3" variant="primary" type="submit">
                            나는 이 상을 받아따! (확인)
                        </Button>
                        <Button variant="danger" onClick={() => {
                                setIsInserting(false)
                                console.log('CANCEL BUTTON HAS BEEN CLICKED')
                            }
                        }> 
                            사실 못 받았다.. (취소)
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
}

export default AwardInsertingForm;

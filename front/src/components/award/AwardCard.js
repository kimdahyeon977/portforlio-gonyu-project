import {Button, Card, Col, Row} from "react-bootstrap"

function AwardCard({award, isEditable, setIsEditing}){
    return <Card.Text>
        <Row>
            <Col>
                <div>{award.title}</div>
                <div>{award.description}</div>
            </Col>
            {
                isEditable && (
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="info"
                            onClick={()=>{setIsEditing(true)}}
                            style={{height : '80%'}}
                        >
                            Edit
                        </Button>
                    </Col>
                )
            }
        </Row>
    </Card.Text>
}

export default AwardCard;

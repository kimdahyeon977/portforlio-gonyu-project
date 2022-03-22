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
                    <Col>
                        <Button
                            variant="info"
                            onClick={()=>{setIsEditing(true)}}
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

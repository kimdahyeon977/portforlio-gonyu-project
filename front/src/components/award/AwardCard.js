import React from "react";
import {Card, Row} from "react-bootstrap"

function AwardCard(){
    return <Card className="mb-2 ms-3 mr-5" xs={1} sm={2}>
        <Card.Body>
            <Card.Title>
                <Row className="justify-content-md-left">
                    수상이력
                </Row>
            </Card.Title>
            <Card.Subtitle>
                <Row>
                    subtitle?
                </Row>
            </Card.Subtitle>
            <Card.Text>
                <Row style={{color: "grey"}}>
                    Text
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>
}

export default AwardCard;

import {Button, Card, Col, Row} from "react-bootstrap"

function ProjectCard({curProject, isEditable, setIsEditing}){
    return <Card.Text>
        <Row>
            <Col>
                <div>{curProject.title}</div>
                <div>{curProject.description}</div>
                <div>
                    <span>
                        from
                        {curProject.fromDate}
                    </span>
                    <span>
                        to
                        {curProject.toDate}
                    </span>
                </div>
            </Col>
            {
                isEditable && (
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="outline-info"
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

export default ProjectCard;

import { Card, Button, Row, Col} from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }){
  return (
    <Card>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${
            education.position || ""
          })`}</span>
        </Col>
        {isEditable && (
          <Col lg="1">
            <Button
              variant="outline-info"
              onClick={() => setIsEditing((editedPage) => !editedPage )}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default EducationCard;
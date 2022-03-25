import { Card, Button, Row, Col} from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }){
  return (
    <Card className="px-3 py-3">
      <Row className="align-items-center" xs="auto">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{`${education.major} (${
            education.position || ""
          })`}</span>
        </Col>
        {isEditable && (
          <Col className="ms-auto">
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
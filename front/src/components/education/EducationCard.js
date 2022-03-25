import { Card, Button, Row, Col} from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducationList }){

  const handleDeleteSubmit = async(e) => {
    e.preventDefault();

    await Api.delete("educations", education.id);
    setEducationList((current) => {
      return current.filter((userEdu) => userEdu.id !== education.id)
  })
}
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
              className="me-3"
              onClick={() => setIsEditing((editedPage) => !editedPage )}
            >
              편집
            </Button>
            <Button
              variant="outline-info"
              onClick={handleDeleteSubmit}
            >
              삭제
            </Button>
          </Col>
          )}
      </Row>
    </Card>
  )
}

export default EducationCard;
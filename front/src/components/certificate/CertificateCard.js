import { Card, Button, Row, Col} from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({ certificate, isEditable, setIsEditing, setCertificateList }){

  const handleDeleteSubmit = async(e) => {
    e.preventDefault();

    await Api.delete("certificates", certificate.id);
    setCertificateList((current) => {
      return current.filter((userCertificate) => userCertificate.id !== certificate.id)
  })
}

  return (
    <Card className="px-3 py-3">
      <Row className="align-items-center" xs="auto">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{`${certificate.description} (${
            certificate.when_date || ""
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

export default CertificateCard;
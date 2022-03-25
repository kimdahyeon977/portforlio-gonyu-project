import { Card, Button, Row, Col} from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }){
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

export default CertificateCard;
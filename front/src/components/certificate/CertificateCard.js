import { Card, Button, Row, Col} from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }){
  return (
    <Card>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.when_date}</span>
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

export default CertificateCard;
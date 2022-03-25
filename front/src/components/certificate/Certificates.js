import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Certificate from "./Certificate";
import * as Api from "../../api";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable}) {

  const [certificateList, setCertificateList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificateList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificateList.map((certificate) => (
          <React.Fragment key={certificate.id}>
            <Certificate
              certificate={certificate}
              isEditable={isEditable}
              setCertificateList={setCertificateList}
              />
            <div className="mb-2"></div>
          </React.Fragment>
        ))}

        {isEditable && (
          <Row className="text-center">
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificateList={setCertificateList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
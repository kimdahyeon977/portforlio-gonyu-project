import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Certificate from "./Certificate";
import * as Api from "../../api";
import CertificateAdd from "./CertificateAdd";

function CertificateLevel({ portfolioOwnerId, isEditable}) {

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
          <Certificate
            key={certificate.id}
            certificate={certificate}
            isEditable={isEditable}
            setCertificateList={setCertificateList}
            />
        ))}

        {isEditable && (
          <Row className="text-center">
            <Col>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAdd
            portfolioOwnerId={portfolioOwnerId}
            setCertificateList={setCertificateList}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default CertificateLevel;
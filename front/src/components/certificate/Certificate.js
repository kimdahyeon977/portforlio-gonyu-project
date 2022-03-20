import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certificate, setCertificateList, isEditable }) {
  const [ isEditing, setIsEditing ] = useState(false)
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setIsEditing={setIsEditing}
          setCertificateList={setCertificateList}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Certificate;
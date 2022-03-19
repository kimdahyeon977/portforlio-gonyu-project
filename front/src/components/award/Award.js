import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award(){
    const [isEdit, setIsEdit] = useState(false);
    return <>
        {isEdit ? (
            <AwardEditForm></AwardEditForm>
        ) : (
            <AwardCard></AwardCard>
        )
        }
    </>
}

export default Award;
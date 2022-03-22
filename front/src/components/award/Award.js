import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({award, setAwards, isEditable}){
    const [isInserting, setIsInserting] = useState(false);
    return <>
        {isInserting ? (
            <AwardEditForm 
                setAwards={setAwards}
                currentAward={award}
                setIsEditing={setIsInserting}
            />
        ) : (
            <AwardCard 
                award={award}
                isEditable={isEditable}
                setIsInserting={setIsInserting}   
            />
        )}
    </>
}

export default Award;
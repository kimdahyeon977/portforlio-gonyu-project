import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({award, setAwards, isEditable}){
    const [isEditing, setIsEditing] = useState(false);
    return <>
        {isEditing ? (
            <AwardEditForm 
                setAwards={setAwards}
                curAward={award}
                setIsEditing={setIsEditing}
            />
        ) : (
            <AwardCard 
                award={award}
                isEditable={isEditable}
                setIsEditing={setIsEditing}   
            />
        )}
    </>
}

export default Award;
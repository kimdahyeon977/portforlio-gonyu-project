import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardEditForm from "./AwardEditForm";

function Award({award, setAwards, isEditable}){
    const [isEditing, setIsEditing] = useState(false);
    return <>
        {isEditing ? (
            <AwardEditForm
                setAward = {isEditing}
                curAward = {award}
                setIsEditing = {setIsEditing}
            />
        ) : (
            <AwardCard
                curAward = {award}
                isEditable = {isEditable}
                setIsEditing = {setIsEditing}
            />
        )}
    </>
}

export default Award;
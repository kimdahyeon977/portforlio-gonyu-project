import React, { useContext, useEffect, useState } from "react"
import {Row, Col, Button, Card} from "react-bootstrap"

import * as API from "../../api"
import { DarkModeContext } from "../../App"
import Project from "./Project"
import ProjectInserting from "./ProjectInserting"

function ProjectList({projectOwnerId, isEditable}){
    const {isDarkMode} = useContext(DarkModeContext);
    const [projectList, setProjectList] = useState([]);
    const [isInserting, setIsInserting] = useState(false);

    const ownerId = projectOwnerId;

    useEffect(() => {
        API.get("projectlist", ownerId)
            .then((res) => setProjectList(res.data))
    }, [ownerId])

    return (
        <Card
            style={{backgroundColor : isDarkMode ? "#222":"#FFF", color : isDarkMode ? "#FFF":"#000"}}
        >
            <Card.Body>
                <Card.Title>
                    프로젝트
                </Card.Title>
                {
                    projectList.map((item) => 
                        <Project
                            curProejct={item}
                            setProjectList={setProjectList}
                            isEditable={isEditable}
                        ></Project>
                    )
                }
                {
                    isEditable && (
                        <Row className="text-center mb-3">
                            <Col>
                                <Button
                                    onClick={()=>setIsInserting(true)}
                                >+</Button>
                            </Col>
                        </Row>
                    )
                }
                {
                    isInserting && (
                        <ProjectInserting
                            ownerId={ownerId}
                            setProjectList={setProjectList}
                            setIsInserting={setIsInserting}
                        ></ProjectInserting>
                    )
                }
            </Card.Body>
        </Card>
    )
}

export default ProjectList;
import React, { useEffect, useState } from "react"
import {Row, Col, Button, Card} from "react-bootstrap"

import * as API from "../../api"
import Project from "./Project"
import ProjectInserting from "./ProjectInserting"

function ProjectList({projectOwnerId, isEditable}){
    const [projectList, setProjectList] = useState([]);
    const [isInserting, setIsInserting] = useState(false);

    const ownerId = projectOwnerId;

    useEffect(() => {
        API.get("projectlist", ownerId)
            .then((res) => setProjectList(res.data))
    }, [ownerId])

    return (
        <Card>
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
import {Button, Card, Col, Row} from 'react-bootstrap'
import { useEffect, useState } from "react"
import * as API from "../../api"
import Award from './Award'
import AwardInsertingForm from './AwardInsertingForm.js'

function Awards({ownerId, isEditable}){
    const [awards, setAwards] = useState([]) //수상 리스트를 빈 배열로 초기화해서 시작
    const [isInserting, setIsInserting] = useState(false)

    // ownerId의 수상목록을 한 번 불러옴
    useEffect(() => {
        API.get("awardlist", ownerId)
            .then((res) => {
                // useState의 setAwards를 이용해서 awards에 수상목록 배열을 저장
                return setAwards(res.data);
            })
    }, [ownerId])

    return <Card>
        <Card.Body>
            <Card.Title>
                수상목록
            </Card.Title>
            <Row>
                {
                    awards.map((item) => 
                        <Award
                            key = {item.id}
                            award = {item}
                            setAwards = {setAwards}
                            isEditable = {isEditable}
                        >
                        </Award>
                    )
                }
                {
                    isEditable && (
                        <Col className="text-center">
                            <Button onClick={()=>setIsInserting(true)}>+</Button>
                        </Col>
                    )
                }
            </Row>
            {
                isInserting && (
                    <AwardInsertingForm
                        setIsInserting = {setIsInserting}
                        ownerId = {ownerId}
                        setAwards = {setAwards}
                    />
                )
            }
        </Card.Body>
    </Card>
}

export default Awards;

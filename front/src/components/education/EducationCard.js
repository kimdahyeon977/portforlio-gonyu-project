import { Card, ListGroup } from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }){
  return (
    <Card style={{ width: '30rem' }}>
    <ListGroup variant="flush">
    <ListGroup.Item>{education.school}</ListGroup.Item>
    <ListGroup.Item>ddd</ListGroup.Item>
    <ListGroup.Item>Vestibulum  eros</ListGroup.Item>
  </ListGroup>
</Card>
  )
}

export default EducationCard;
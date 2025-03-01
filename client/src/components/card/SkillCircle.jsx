import { Card, Badge } from "react-bootstrap";
import "./Skill.css";

const SkillCircle = (props) => {
  const getBadgeColor = (category) => {
    switch (category) {
      case "Backend":
        return "primary";
      case "Frontend":
        return "success";
      case "Maquettage":
        return "warning";
      case "Test":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getBadgeLevel = (level) => {
    switch (level) {
      case "Beginner":
        return "gray";
      case "Intermediate":
        return "secondary";
      default:
        return "black";
    }
  };
  return (
    <Card className="project-card-view rounded-card">
      <Card.Img
        className="image-card rounded-image"
        variant="top"
        src={props.urlImage}
        alt={props.title}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          <Badge pill bg={getBadgeColor(props.category)} className="me-2">
            {props.category}
          </Badge>
          <Badge pill bg={getBadgeLevel(props.level)} className="me-2">
            {props.level}
          </Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SkillCircle;

import Card from "react-bootstrap/Card";

const SkillCards = (props) => {
  return (
    <Card className="project-card-view">
      <Card.Img
        className="image-card"
        variant="top"
        src={props.urlImage}
        alt={props.title}
      />
      <Card.Body>
        <Card.Title style={{ textAlign: "center" }}>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "center" }}>
          Category : {props.category} <br />
          Level : {props.level}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SkillCards;

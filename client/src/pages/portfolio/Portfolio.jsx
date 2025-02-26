import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import OngletTitle from "../../hooks/OngletTitle";
import { useAuth } from "../../context/AuthContext";
import SkillCards from "../../components/card/SkillCards";

const API_URL = import.meta.env.VITE_API_URL;

const Portfolio = () => {
  OngletTitle("Portfolio");
  const [skills, setSkills] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getSkills = async () => {
      const id = user.id;
      try {
        const response = await axios.get(`${API_URL}/api/auth/${id}`);

        setSkills(response.data.skills);
      } catch (error) {
        console.log("Error fetching skills",error);
        setSkills([]);
      }
    };
    getSkills([]);
  }, []);

  return (
    <Container fluid className="project-section">
      <h1 className="project-heading">Portfolio</h1>
      <Row style={{ justifyContent: "center" }}>
        {skills.map((skill) => (
          <Col xs={12} sm={6} lg={4} className="project-card">
            <SkillCards key={skill._id} {...skill} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Portfolio;

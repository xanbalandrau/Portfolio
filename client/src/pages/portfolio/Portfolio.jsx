import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import OngletTitle from "../../hooks/OngletTitle";
import { useAuth } from "../../context/AuthContext";
import SkillCards from "../../components/card/SkillCards";
import SkillCircle from "../../components/card/SkillCircle";
import SettingsButton from "../../components/SettingsButton";
import LightTheme from "../../components/theme/LightTheme";
import DarkTheme from "../../components/theme/DarkTheme";

import "./Portfolio.css";

const API_URL = import.meta.env.VITE_API_URL;

const Portfolio = () => {
  OngletTitle("Portfolio");
  const [skills, setSkills] = useState([]);
  const { user } = useAuth();

  const [settings, setSettings] = useState({});
  const [theme, setTheme] = useState("LightTheme");
  const [skillCard, setSkillCard] = useState("card");

  useEffect(() => {
    const getSkills = async () => {
      const id = user.id;
      try {
        const response = await axios.get(`${API_URL}/api/auth/${id}`);

        setSkills(response.data.skills);
      } catch (error) {
        console.log("Error fetching skills", error);
        setSkills([]);
      }
    };
    getSkills([]);
  }, []);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const id = user.id;
        const response = await axios.get(`${API_URL}/api/setting/`, { id });

        setTheme(response.data.setting.theme);
        setSkillCard(response.data.setting.skill);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    getSettings();
  }, [user]);

  const handleUpdateTheme = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/setting/theme`, {
        theme,
      });
      setSettings(response.data.setting);
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  const handleUpdateSkill = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/setting/skill`, {
        skillCard,
      });
      setSettings(response.data.setting);
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  return (
    <Container
      fluid
      className={`project-section ${
        theme === "LightTheme" ? "theme-light" : "theme-dark"
      }`}
    >
      {theme === "LightTheme" ? <LightTheme /> : <DarkTheme />}

      <div className="d-flex justify-content-center align-items-center pt-2 mb-4">
        <h1 className="project-heading mb-0 text-center m-5">Portfolio</h1>
        <SettingsButton
          settings={settings}
          theme={theme}
          skillCard={skillCard}
          setTheme={setTheme}
          setSkill={setSkillCard}
          handleUpdateTheme={handleUpdateTheme}
          handleUpdateSkill={handleUpdateSkill}
        />
      </div>

      {skillCard === "card" ? (
        <Row style={{ justifyContent: "center" }}>
          {skills.map((skill) => (
            <Col xs={12} sm={6} lg={4} className="project-card">
              <SkillCards key={skill._id} {...skill} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row style={{ justifyContent: "center" }}>
          {skills.map((skill) => (
            <Col xs={12} sm={6} lg={4} className="project-card">
              <SkillCircle key={skill._id} {...skill} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Portfolio;

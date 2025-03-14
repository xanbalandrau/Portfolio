import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import OngletTitle from "../../hooks/OngletTitle";
import "./Home.css";

const Home = () => {
  OngletTitle("Home");
  return (
    <div className="home-page">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h1 className="hero-title">
                Créez votre portfolio en quelques minutes
              </h1>
              <p className="hero-subtitle">
                Présentez vos projets, compétences et expériences avec un
                portfolio professionnel et personnalisé.
                <br />
                Créez vous un compte gratuitement pour commencer.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="features-section">
        <Container>
          <h2 className="text-center mb-5 ">
            Pourquoi choisir notre plateforme ?
          </h2>
          <Row className="text-center">
            <Col md={4}>
              <div className="feature-item">
                <i className="fas fa-paint-brush feature-icon"></i>
                <h3 style={{ fontWeight: "bold" }}>Design personnalisable</h3>
                <p className="mt-3">
                  Choisissez parmi des modèles modernes et personnalisez-les
                  selon vos préférences.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item">
                <i className="fas fa-mobile-alt feature-icon"></i>
                <h3 style={{ fontWeight: "bold" }}>
                  Responsive et mobile-friendly
                </h3>
                <p className="mt-3">
                  Votre portfolio sera parfaitement adapté à tous les appareils.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item">
                <i className="fas fa-rocket feature-icon"></i>
                <h3 style={{ fontWeight: "bold" }}>Simple et rapide</h3>
                <p className="mt-3">
                  Créez et publiez votre portfolio en quelques étapes seulement.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Exemples de portfolios */}
      <section className="portfolio-showcase">
        <Container>
          <h2 className="text-center mb-5">
            Inspirez-vous de nos utilisateurs
          </h2>
          <Row>
            <Col md={4}>
              <Card className="portfolio-card">
                <Card.Img
                  variant="top"
                  src="/portfolio-dev.png"
                  alt="portfolio de John"
                />
                <Card.Body className="home_card">
                  <Card.Title>Portfolio de John Doe</Card.Title>
                  <Card.Text>
                    Un portfolio élégant et professionnel pour un développeur.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="portfolio-card">
                <Card.Img
                  variant="top"
                  src="/portfolio-design.png"
                  alt="portfolio de Jane"
                />
                <Card.Body className="home_card">
                  <Card.Title>Portfolio de Jane Smith</Card.Title>
                  <Card.Text>
                    Un portfolio créatif pour une designer graphique.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="portfolio-card">
                <Card.Img
                  variant="top"
                  src="/portfolio_photographe.png"
                  alt="portfolio d'Alex"
                />
                <Card.Body className="home_card">
                  <Card.Title>Portfolio de Alex Johnson</Card.Title>
                  <Card.Text>
                    Un portfolio minimaliste pour un photographe.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Témoignages */}
      <section className="testimonials-section">
        <Container>
          <h2 className="text-center mb-5">Ce que disent nos utilisateurs</h2>
          <Row className="text-center">
            <Col md={4}>
              <div className="testimonial-item">
                <p className="testimonial-text">
                  "Cette plateforme m'a permis de créer un portfolio
                  professionnel en un temps record. Je la recommande vivement !"
                </p>
                <p className="testimonial-author">- John Doe</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial-item">
                <p className="testimonial-text">
                  "Les modèles sont magnifiques et faciles à personnaliser. Mon
                  portfolio a vraiment fait la différence."
                </p>
                <p className="testimonial-author">- Jane Smith</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial-item">
                <p className="testimonial-text">
                  "Un outil incroyable pour présenter mes projets. Je suis très
                  satisfait du résultat final."
                </p>
                <p className="testimonial-author">- Alex Johnson</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Go to Register */}
      <section className="cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h2>Prêt à créer votre portfolio ?</h2>
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Commencer maintenant
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;

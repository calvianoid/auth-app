import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <Container id="welcome-section">
        <h1>Welcome Back!</h1>
        <p className="text-primary">Auth Page with React & Express</p>
      </Container>
    </div>
  );
};

export default Home;

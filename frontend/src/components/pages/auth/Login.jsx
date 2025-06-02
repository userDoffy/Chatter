import React from 'react';
import { Form, Button, Container, Row, Col, Card, Image, Alert, Spinner } from 'react-bootstrap';
import Lottie from 'lottie-react';
import loginAnimation from '../../../assets/loginAnimation.json';
import useForm from '../../../customhooks/useForm'
import { loginUser } from '../../../axios/authApi';
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response.status === 200) {
      navigate("/");
      toast.success("Login successful");
    }
    else{
      navigate("/login");
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const { formData, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <Container fluid className="vh-100 d-flex align-items-center" style={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        overflow: 'hidden',
      }}>
        <Row className="w-100 h-100">
          <Col md={6} className="d-none d-md-flex justify-content-center align-items-center" style={{ background: '#f7f9fc' }}>
            <Lottie animationData={loginAnimation} style={{ height: 850 }} loop />
          </Col>

          <Col md={6} className="d-flex justify-content-center align-items-center fade-in">
            <Card className="p-5 shadow-lg rounded-5 w-100 mx-3" style={{ maxWidth: '420px', backgroundColor: '#fff' }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <Image src="/Chatter.png" alt="App Logo" width={120} height={120} style={{ objectFit: 'contain' }} />
                </div>

                <h2 className="mb-4 text-center fw-bold accent-color fancy-heading">Welcome</h2>



                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fancy-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="fancy-input"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fancy-label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="fancy-input"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-semibold shadow-sm btn-accent"
                    size="lg"
                   
                  >
                    Log In
                  </Button>
                </Form>

                <p className="mt-4 text-center text-muted">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-decoration-none accent-color fw-semibold hover-underline">
                    Sign Up
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <style>{`
        @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in {
            animation: fadeIn 1s ease forwards;
          }

          body, .fancy-input, .fancy-label, .fancy-heading {
            font-family: 'Poppins', 'Segoe UI', sans-serif;
          }

          .fancy-heading {
            letter-spacing: 2px;
            font-weight: 700;
            font-size: 2.1rem;
            text-transform: uppercase;
          }

          .fancy-label {
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #444444;
          }

          .fancy-input {
            font-weight: 400;
            letter-spacing: 0.3px;
            font-size: 1rem;
            border-radius: 0.5rem;
            border: 1.5px solid #ddd;
            transition: border-color 0.3s ease;
          }

          .fancy-input:focus {
            border-color: #2575fc;
            box-shadow: 0 0 5px rgba(37, 117, 252, 0.4);
          }

          .accent-color {
            color: #2575fc;
          }

          .btn-accent {
            background: #2575fc;
            border: none;
            transition: background 0.3s ease;
          }

          .btn-accent:hover, .btn-accent:focus {
            background: #1a52d1;
          }

          .hover-underline:hover {
            text-decoration: underline;
            color: #1a52d1;
          }
        `}</style>
      </Container>
    </>
  );
};

export default Login;

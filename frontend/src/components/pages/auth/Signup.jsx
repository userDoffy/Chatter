import React from 'react';
import { Form, Button, Container, Row, Col, Card, Image, Alert } from 'react-bootstrap';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import signupAnimation from '../../../assets/signupAnimation.json';
import useForm from '../../../customhooks/useForm';
import { signupUser } from '../../../axios/authApi'
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser(formData);
      console.log("Signup response:", response);
      if (response.status === 201) {
        navigate("/two-factor-auth", { state: { email: formData.email } });
      } else {
        navigate("/signup");
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
       navigate("/signup");
      toast.error("Signup failed. Please try again.");
    }
  };

  const { formData, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      <Container fluid className="vh-100 d-flex align-items-center" style={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        overflow: 'hidden',
      }}>
        <Row className="w-100 h-100">
          <Col md={6} className="d-none d-md-flex justify-content-center align-items-center" style={{ background: '#f7f9fc' }}>
            <Lottie animationData={signupAnimation} style={{ height: 850 }} loop />
          </Col>

          <Col md={6} className="d-flex justify-content-center align-items-center fade-in">
            <Card className="p-5 shadow-lg rounded-5 w-100 mx-3" style={{ maxWidth: '420px', backgroundColor: '#fff' }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <Image src="/Chatter.png" alt="App Logo" width={120} height={120} style={{ objectFit: 'contain' }} />
                </div>

                <h2 className="mb-4 text-center fw-bold accent-color fancy-heading">Create an Account</h2>


                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fancy-label">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      className="fancy-input"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fancy-label">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="fancy-input"
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
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 fw-semibold shadow-sm btn-accent" size="lg">
                    Sign Up
                  </Button>
                </Form>

                <p className="mt-4 text-center text-muted">
                  Already have an account?{' '}
                  <a href="/login" className="text-decoration-none accent-color fw-semibold hover-underline">
                    Log In
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Inline styles moved for brevity */}
      </Container>
    </>
  );
};

export default Signup;

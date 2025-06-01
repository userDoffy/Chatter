import React, { useRef, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Image } from 'react-bootstrap';

const TwoFactorAuth = () => {
  const [code, setCode] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return; // allow only digits or empty

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    // TODO: Validate code or submit
    
  };

  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          background: 'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)',
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4 shadow-lg rounded-4 border-0">
              <Card.Body className="text-center">
                <Image
                  src="/gmail.jpg"
                  alt="Gmail"
                  width={60}
                  className="mb-3"
                />
                <h3 className="mb-3 fw-bold">Enter the code</h3>
                <p className="text-muted mb-4">
                  We've sent a 6-digit verification code to your Gmail.
                </p>

                <Form onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-center mb-4" style={{ gap: '0.75rem' }}>
                    {code.map((digit, idx) => (
                      <Form.Control
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target, idx)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        ref={el => inputsRef.current[idx] = el}
                        className="text-center fs-3 border rounded-3 shadow-sm"
                        style={{ width: '3.5rem', height: '3.5rem', letterSpacing: '0.75rem'}}
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>

                  {/* Feedback or error messages */}
                  <Alert variant="danger" className="d-none">Invalid code. Please try again.</Alert>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-semibold py-2"
                    style={{ backgroundColor: '#4285F4', border: 'none' }}
                  >
                    Verify Code
                  </Button>
                </Form>

                <p className="mt-4 text-muted">
                  Didn't receive the code?{' '}
                  <a href="#" className="text-primary text-decoration-none fw-semibold">
                    Resend
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Inline font import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default TwoFactorAuth;

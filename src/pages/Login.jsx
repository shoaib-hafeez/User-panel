import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate , Link} from 'react-router-dom';
import { loginUser } from '../services/Auth-service';
import useUserStore from '../store/User-store'; // Import the store

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useUserStore(); // Zustand's setUser method

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await loginUser({ email, password });
  
      if (response.status === 200 || response.status === 201) {
        const token = response.data.data.accessToken; 
        const user = response.data.data.user;
  
        localStorage.setItem('authToken', token);  // 🔑 Token save
        setUser(user);  // 🏷 Zustand + localStorage mein user save
  
        alert('Login successful!');
        navigate('/');  // 🚀 Redirect
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container className="my-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <p className="text-danger mt-3 me-3">{error}</p>}
        <Button type="submit" className="mt-3" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <br />
        <p className="mt-3">dont have account please <Link to={'/signup'}>signup </Link>  </p>
        
       
      </Form>
    </Container>
  );
};

export default Login;

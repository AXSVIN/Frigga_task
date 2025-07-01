import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = '#000';
    document.body.style.color = '#fff';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // ✅ Basic front-end validation
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/alldata', formData);

      alert(res.data.message);

      // ✅ Simple hardcoded admin check (ideally, server should handle this)
      if (email === 'ashwin@gmail.com' && password === '123456') {
        navigate('/admin');
      } else {
        navigate('/pro');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoToGuest = () => {
    navigate('/pro');
  };

  const handleGoToRegister = () => {
    navigate('/');
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
    },
    formBox: {
      width: '350px',
      padding: '30px',
      border: '1px solid #444',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
      backgroundColor: '#111',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#fff',
      fontSize: '28px',
      fontWeight: '600',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #666',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#222',
      color: '#fff',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
    },
    loginButton: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    guestButton: {
      backgroundColor: '#ffc107',
      color: '#000',
    },
    registerButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    errorText: {
      color: '#dc3545',
      fontSize: '14px',
      marginBottom: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={{ ...styles.button, ...styles.loginButton }}>Login</button>
        </form>

        <button onClick={handleGoToGuest} style={{ ...styles.button, ...styles.guestButton }}>
          Continue as Guest
        </button>
        <button onClick={handleGoToRegister} style={{ ...styles.button, ...styles.registerButton }}>
          Go to Register
        </button>
      </div>
    </div>
  );
}

export default Login;

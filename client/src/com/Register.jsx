import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    setMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { email, phone, password, confirmPassword } = formData;

      const res = await axios.post('http://localhost:5000/hp', {
        email,
        phone,
        password,
        confirmPassword
      });

      setMessage(res.data.message || 'Registration successful');
      navigate('/pro');
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    }
  };

  const handleGoToGuest = () => {
    navigate('/pro');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const styles = {
    registerContainer: {
      width: '350px',
      padding: '30px',
      border: '1px solid #444',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
      backgroundColor: '#111',
      color: '#fff',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    registerHeading: {
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '28px',
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: '15px',
    },
    formInput: {
      width: '100%',
      padding: '12px',
      border: '1px solid #666',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#222',
      color: '#fff',
    },
    formInputError: {
      borderColor: '#dc3545',
    },
    errorText: {
      color: '#dc3545',
      fontSize: '14px',
      marginTop: '5px',
    },
    messageText: {
      textAlign: 'center',
      marginTop: '15px',
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '15px',
    },
    successMessage: {
      backgroundColor: '#155724',
      color: '#d4edda',
      border: '1px solid #c3e6cb',
    },
    errorMessage: {
      backgroundColor: '#721c24',
      color: '#f8d7da',
      border: '1px solid #f5c6cb',
    },
    registerButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '20px',
    },
    navigationButtons: {
      marginTop: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    navButton: {
      width: '100%',
      padding: '12px',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      textAlign: 'center',
    },
    loginButtonColor: {
      backgroundColor: '#007bff',
    },
    guestButtonColor: {
      backgroundColor: '#ffc107',
      color: '#000',
    },
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
    }}>
      <div style={styles.registerContainer}>
        <h2 style={styles.registerHeading}>Register</h2>

        {message && (
          <p style={{
            ...styles.messageText,
            ...(message.toLowerCase().includes('failed') ? styles.errorMessage : styles.successMessage)
          }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.formInput,
                ...(errors.email && styles.formInputError)
              }}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                ...styles.formInput,
                ...(errors.phone && styles.formInputError)
              }}
            />
            {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                ...styles.formInput,
                ...(errors.password && styles.formInputError)
              }}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                ...styles.formInput,
                ...(errors.confirmPassword && styles.formInputError)
              }}
            />
            {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          <button type="submit" style={styles.registerButton}>Register</button>
        </form>

        <div style={styles.navigationButtons}>
          <button
            onClick={handleGoToLogin}
            style={{ ...styles.navButton, ...styles.loginButtonColor }}
          >
            Go to Login
          </button>
          <button
            onClick={handleGoToGuest}
            style={{ ...styles.navButton, ...styles.guestButtonColor }}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

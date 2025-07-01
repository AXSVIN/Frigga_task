import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000/alldata';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/ph', form);
    }
    setForm({ email: '', phone: '', password: '' });
    fetchUsers();
  } catch (error) {
    console.error('Error saving user:', error);
    setError('Failed to save user.');
  }
};

  const handleEdit = (user) => {
    setForm({ email: user.email, phone: user.phone, password: user.password });
    setEditingId(user._id);
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const handleGoToPortfolio = () => {
    navigate('/pro');
  };

  const containerStyle = {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1 1 200px',
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const actionButtonStyle = {
    ...buttonStyle,
    marginRight: '8px',
    backgroundColor: '#28a745',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2>User Dashboard</h2>

      {error && <p style={errorStyle}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {editingId ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* ✅ Portfolio button outside form to prevent accidental form submit */}
      <button onClick={handleGoToPortfolio} style={buttonStyle}>
        Go to Portfolio
      </button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Email</th>
            <th style={thTdStyle}>Phone</th>
            <th style={thTdStyle}>Password</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={thTdStyle}>{user.email}</td>
              <td style={thTdStyle}>{user.phone}</td>
              <td style={thTdStyle}>{user.password}</td>
              <td style={thTdStyle}>
                <button
                  onClick={() => handleEdit(user)}
                  style={actionButtonStyle}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [editingId, setEditingId] = useState(null);
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
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const portfolio = () => {
    navigate('/pro');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ email: '', phone: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setForm({ email: user.email, phone: user.phone, password: user.password });
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const containerStyle = {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
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

  return (
    <div style={containerStyle}>
      <h2>User Dashboard</h2>

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
        <button  style={buttonStyle} onClick={portfolio}  >
          {editingId ? 'Portfolio' : 'Portfolio User'}
        </button>
      </form>

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

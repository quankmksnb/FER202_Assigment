import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AccountCreate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:9999/roles');
        const data = await res.json();
        setRoles(data);
      } catch (err) {
        console.error('Failed to fetch roles', err);
        setError('Unable to load roles');
      }
    };

    fetchRoles();
  }, []);

  const handleRoleChange = (roleId) => {
    setSelectedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || selectedRoles.length === 0) {
      setError('Please fill all fields and select at least one role.');
      return;
    }

    try {
      // 1. Create user
      const userRes = await fetch('http://localhost:9999/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          address: '',
          phone: '',
          password: '12345' // hoặc để backend tự xử lý
        })
      });

      const newUser = await userRes.json();

      if (!userRes.ok || !newUser.id) {
        throw new Error('Failed to create user');
      }

      // 2. Create user_roles
      await Promise.all(
        selectedRoles.map(roleId =>
          fetch('http://localhost:9999/user_roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: newUser.id,
              role_id: roleId
            })
          })
        )
      );
      // thông báo
      alert('New user has been created successfully!');
      // 3. chuyển hướng về list account
      navigate('/account');
    } catch (err) {
      console.error('Error creating account', err);
      setError('Failed to create account');
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem' }}>
      <h3 className="mb-4">Create New Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRoles">
          <Form.Label>Roles</Form.Label>
          <div>
            {roles.map(role => (
              <Form.Check
                key={role.id}
                type="checkbox"
                label={role.name}
                checked={selectedRoles.includes(role.id)}
                onChange={() => handleRoleChange(role.id)}
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Card>
  );
};

export default AccountCreate;

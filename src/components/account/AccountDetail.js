import React, { useState, useEffect } from 'react';
import { Card, Input, Form, Tag } from 'antd';
import { Button, FormCheck } from 'react-bootstrap';

const AccountDetail = ({ account, roles, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState({ ...account });
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  useEffect(() => {
    setEditedAccount({ ...account });
    const roleIds = roles
      .filter(role => account.roles.includes(role.name))
      .map(role => role.id);
    setSelectedRoleIds(roleIds);
    setIsEditing(false);
  }, [account, roles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (roleId) => {
    setSelectedRoleIds(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleUpdate = () => {
    if (!editedAccount.name || !editedAccount.address || !editedAccount.phone) return;

    const updateData = {
      ...editedAccount,
      email: account.email // keep email unchanged
    };

    onUpdate(updateData, selectedRoleIds);
    setIsEditing(false);
  };

  return (
    <Card
      title="Account Details"
      extra={<Button variant="danger" onClick={onClose}>Close</Button>}
    >
      <Form layout="vertical">
        <Form.Item label="ID">
          <Input value={editedAccount.id} disabled />
        </Form.Item>

        <Form.Item label="Name">
          <Input
            name="name"
            value={editedAccount.name}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input value={account.email} disabled />
        </Form.Item>

        <Form.Item label="Roles">
          {!isEditing ? (
            account.roles && account.roles.length > 0 ? (
              account.roles.map((role, index) => (
                <Tag color="blue" key={index}>{role}</Tag>
              ))
            ) : 'No roles assigned'
          ) : (
            <div>
              {roles.map(role => (
                <FormCheck
                  key={role.id}
                  label={role.name}
                  checked={selectedRoleIds.includes(role.id)}
                  onChange={() => handleCheckboxChange(role.id)}
                />
              ))}
            </div>
          )}
        </Form.Item>

        <Form.Item label="Address">
          <Input
            name="address"
            value={editedAccount.address}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input
            name="phone"
            value={editedAccount.phone}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          {!isEditing ? (
            <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setEditedAccount({ ...account });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdate}>Update</Button>
            </>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default AccountDetail;

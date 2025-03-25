import React, { useState } from 'react';
import { Card, Input, Form } from 'antd';
import { Button } from 'react-bootstrap';

const AccountDetail = ({ account, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState({ ...account });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    // Basic validation
    if (!editedAccount.name || !editedAccount.email) {
      return;
    }

    // Call the update function passed from parent
    onUpdate(editedAccount);

    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <Card
      title="Account Details"
      extra={
        <Button 
          variant="danger" 
          onClick={onClose}
          style={{ marginRight: 10 }}
        >
          Close
        </Button>
      }
      style={{ 
        height: '100%', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
        overflow: 'auto' 
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <Form layout="vertical">
        <Form.Item label="ID">
          <Input 
            value={editedAccount.id} 
            disabled 
          />
        </Form.Item>

        <Form.Item label="Name">
          <Input 
            name="name"
            value={isEditing ? editedAccount.name : account.name}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input 
            name="email"
            value={isEditing ? editedAccount.email : account.email}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Roles">
          <Input 
            value={account.roles && account.roles.length > 0 
              ? account.roles.join(', ') 
              : 'No roles assigned'} 
            disabled 
          />
        </Form.Item>

        <Form.Item label="Address">
          <Input 
            name="address"
            value={isEditing ? editedAccount.address : account.address}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Phone">
          <Input 
            name="phone"
            value={isEditing ? editedAccount.phone : account.phone}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </Form.Item>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: 20 
        }}>
          {!isEditing ? (
            <Button 
              variant="primary" 
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          ) : (
            <>
              <Button 
                variant="secondary" 
                onClick={() => {
                  setIsEditing(false);
                  setEditedAccount({ ...account });
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleUpdate}
              >
                Update
              </Button>
            </>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default AccountDetail;

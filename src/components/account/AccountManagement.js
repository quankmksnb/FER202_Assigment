import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Select, Row, Col, Card, message } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import AccountDetail from './AccountDetail';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Fetching data logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles, user_roles, and users in parallel using Promise.all
        const [rolesResponse, userRolesResponse, usersResponse] = await Promise.all([
          fetch('http://localhost:9999/roles'),
          fetch('http://localhost:9999/user_roles'),
          fetch('http://localhost:9999/users')
        ]);

        // Parse the response data
        const rolesData = await rolesResponse.json();
        const userRolesData = await userRolesResponse.json();
        const usersData = await usersResponse.json();

        // Process users with their roles
        const updatedAccounts = usersData.map(user => {
          // Find role IDs for this user
          const userRoleIds = userRolesData
            .filter(ur => ur.user_id == user.id)
            .map(ur => ur.role_id);

          // Get role names based on the role IDs
          const userRoleNames = userRoleIds.map(roleId => {
            const role = rolesData.find(r => r.id == roleId);
            return role ? role.name : 'Unknown Role';
          });

          return {
            ...user,
            roles: userRoleNames
          };
        });

        // Set accounts, roles, and userRoles to state
        setRoles(rolesData);
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);
        setLoading(false);  // End loading state
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // End loading state
      }
    };

    fetchData();  // Execute the fetching function
  }, []);

  // Update account function
  const handleUpdateAccount = async (updatedAccount) => {
    try {
      // Send PUT request to update user
      const response = await fetch(`http://localhost:9999/users/${updatedAccount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAccount)
      });

      if (!response.ok) {
        throw new Error('Failed to update account');
      }

      // Update accounts state
      const updatedAccounts = accounts.map(account => 
        account.id === updatedAccount.id ? updatedAccount : account
      );

      setAccounts(updatedAccounts);
      setFilteredAccounts(updatedAccounts);

      // Update the filtered list if filters are active
      filterAccounts(searchText, selectedRoles);

      message.success('Account updated successfully');
    } catch (error) {
      console.error('Error updating account:', error);
      message.error('Failed to update account');
    }
  };

  // Filter function for search and role selection
  const filterAccounts = (search, selectedRoleFilters) => {
    let result = accounts;

    // Filter by search text (name or email)
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(account =>
        account.name.toLowerCase().includes(searchLower) ||
        account.email.toLowerCase().includes(searchLower)
      );
    }

    // Filter by selected roles
    if (selectedRoleFilters.length > 0) {
      result = result.filter(account =>
        account.roles.some(role => selectedRoleFilters.includes(role))
      );
    }

    setFilteredAccounts(result);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    filterAccounts(searchValue, selectedRoles);
  };

  // Handle role selection change
  const handleRoleChange = (selectedValues) => {
    setSelectedRoles(selectedValues);
    filterAccounts(searchText, selectedValues);
  };

  // Handle view detail
  const handleViewDetail = (record) => {
    setSelectedAccount(record);
  };

  // Columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (name) => (
        <div>
          <UserOutlined style={{ marginRight: 8 }} />
          {name}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      align: 'center',
      render: (roles, record) => (
        roles && roles.length > 0 ? (
          roles.map((role, index) => (
            <Tag color="blue" key={`${record.id}-${role}-${index}`}>
              {role}
            </Tag>
          ))
        ) : 'No roles'
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button 
          variant="primary" 
          onClick={() => handleViewDetail(record)}
        >
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="Account Management"
      style={{
        margin: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Row gutter={16}>
        {/* Left Column - Table */}
        <Col xs={24} md={selectedAccount ? 16 : 24}>
          <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 20 }}>
            <Col md={12}>
              <Input
                prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.45)', marginLeft: 8 }} />}
                placeholder="Search accounts..."
                value={searchText}
                onChange={handleSearchChange}
                allowClear
                style={{
                  height: 44,
                  borderRadius: 20,
                  border: '1px solid #1890ff',
                }}
              />
            </Col>
            <Col md={12}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Filter Roles"
                value={selectedRoles}
                onChange={handleRoleChange}
                options={roles.map(role => ({
                  label: role.name,
                  value: role.name,
                }))}
              />
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredAccounts}
            loading={loading}
            rowKey="id"
            bordered={true}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
          />
        </Col>

        {selectedAccount && (
          <Col xs={24} md={8}>
            <AccountDetail 
              account={selectedAccount} 
              onClose={() => setSelectedAccount(null)}
              onUpdate={handleUpdateAccount}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default AccountManagement;

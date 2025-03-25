import React, { useEffect, useState } from 'react';
import { Table, Tag, Input, Select, Row, Col, Card, message } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import AccountDetail from './AccountDetail';
import { useNavigate } from 'react-router-dom';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, userRolesRes, usersRes] = await Promise.all([
          fetch('http://localhost:9999/roles'),
          fetch('http://localhost:9999/user_roles'),
          fetch('http://localhost:9999/users')
        ]);

        const rolesData = await rolesRes.json();
        const userRolesData = await userRolesRes.json();
        const usersData = await usersRes.json();

        const updatedAccounts = usersData.map(user => {
          const userRoleIds = userRolesData
            .filter(ur => ur.user_id == user.id)
            .map(ur => ur.role_id);

          const userRoleNames = userRoleIds.map(roleId => {
            const role = rolesData.find(r => r.id == roleId);
            return role ? role.name : 'Unknown Role';
          });

          return {
            ...user,
            roles: userRoleNames
          };
        });

        setRoles(rolesData);
        setUserRoles(userRolesData);
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Cập nhật xử lý update chuẩn
  const handleUpdateAccount = async (updatedAccount, newRoleIds) => {
    try {
      // 1. Update user info
      const res = await fetch(`http://localhost:9999/users/${updatedAccount.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAccount)
      });
      if (!res.ok) throw new Error('Failed to update user');

      // 2. Xoá tất cả user_roles cũ của user đó
      const oldUserRoles = userRoles.filter(ur => ur.user_id == updatedAccount.id);
      await Promise.all(
        oldUserRoles.map(ur =>
          fetch(`http://localhost:9999/user_roles/${ur.id}`, { method: 'DELETE' })
        )
      );

      // 3. Thêm mới toàn bộ user_roles với role_id đã chọn
      await Promise.all(
        newRoleIds.map(roleId =>
          fetch(`http://localhost:9999/user_roles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: updatedAccount.id,
              role_id: roleId
            })
          })
        )
      );

      // 4. Update local UI
      const updatedRoles = newRoleIds.map(rid => {
        const role = roles.find(r => r.id == rid);
        return role ? role.name : 'Unknown Role';
      });

      const updatedList = accounts.map(acc =>
        acc.id === updatedAccount.id
          ? { ...updatedAccount, roles: updatedRoles }
          : acc
      );

      setAccounts(updatedList);
      filterAccounts(searchText, selectedRoles, updatedList);
      setSelectedAccount({ ...updatedAccount, roles: updatedRoles });

      message.success('Account and roles updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
      message.error('Failed to update account or roles');
    }
  };

  const filterAccounts = (search, selectedRoleFilters, customAccounts = accounts) => {
    let result = [...customAccounts];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(account =>
        account.name.toLowerCase().includes(searchLower) ||
        account.email.toLowerCase().includes(searchLower)
      );
    }

    if (selectedRoleFilters.length > 0) {
      result = result.filter(account =>
        account.roles.some(role => selectedRoleFilters.includes(role))
      );
    }

    setFilteredAccounts(result);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    filterAccounts(value, selectedRoles);
  };

  const handleRoleChange = (selected) => {
    setSelectedRoles(selected);
    filterAccounts(searchText, selected);
  };

  const handleViewDetail = (record) => {
    setSelectedAccount(record);
  };

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
      render: (roles, record) =>
        roles && roles.length > 0 ? (
          roles.map((role, index) => (
            <Tag color="blue" key={`${record.id}-${role}-${index}`}>
              {role}
            </Tag>
          ))
        ) : (
          'No roles'
        ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Button variant="primary" onClick={() => handleViewDetail(record)}>
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Account Management</span>
          <Button variant="success" onClick={() => navigate('/create-account')}>
            + New Account
          </Button>
        </div>
      }
      style={{ margin: '20px' }}
    >
      <Row gutter={16}>
        <Col xs={24} md={selectedAccount ? 16 : 24}>
          <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
            <Col md={12}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search accounts..."
                value={searchText}
                onChange={handleSearchChange}
                allowClear
              />
            </Col>
            <Col md={12}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Filter Roles"
                value={selectedRoles}
                onChange={handleRoleChange}
                options={roles.map(role => ({ label: role.name, value: role.name }))}
              />
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={filteredAccounts}
            loading={loading}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </Col>

        {selectedAccount && (
          <Col xs={24} md={8}>
            <AccountDetail
              account={selectedAccount}
              roles={roles}
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

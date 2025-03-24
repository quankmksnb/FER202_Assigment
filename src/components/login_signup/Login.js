import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9999/users");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        // 🔹 Bước 1: Lấy danh sách roleId từ user_roles
        const roleUserResponse = await fetch(`http://localhost:9999/user_roles?user_id=${user.id}`);
        const userRoles = await roleUserResponse.json();
        console.log("User Roles:", userRoles);

        if (userRoles.length > 0) {
          const roleIds = userRoles.map((ur) => String(ur.role_id)); // Sửa roleId thành role_id
          console.log("User Role IDs:", roleIds);

          // 🔹 Bước 2: Lấy danh sách roles
          const roleResponse = await fetch(`http://localhost:9999/roles`);
          const roles = await roleResponse.json();
          console.log("All Roles:", roles);

          // 🔹 Bước 3: Lọc danh sách role name
          const userRolesNames = roles
            .filter((role) => roleIds.includes(role.id))
            .map((role) => role.name);

          console.log("User Role Names:", userRolesNames);

          // 🔹 Bước 4: Lưu vào localStorage
          const userData = { ...user, roles: userRolesNames };
          localStorage.setItem("user", JSON.stringify(userData));

          message.success("Đăng nhập thành công!");
          navigate("/");
        } else {
          message.error("Không tìm thấy quyền người dùng!");
        }
      } else {
        message.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Lỗi khi đăng nhập!");
    }
    setLoading(false);
  };


  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Đăng Nhập</Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center", display: "block" }}>
          Chưa có tài khoản?{" "}
          <a href="/register" style={{ color: "#1890ff" }}>Đăng ký ngay</a>
        </Text>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    width: 400,
    padding: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
  },
};

export default Login;

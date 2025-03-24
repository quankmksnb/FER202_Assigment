import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:9999/users");
      if (!response.ok) throw new Error("Không thể lấy danh sách người dùng!");
  
      const users = await response.json();
  
      // Kiểm tra email đã tồn tại chưa
      const existingUser = users.find((u) => u.email === values.email);
      if (existingUser) {
        message.error("Email đã tồn tại! Vui lòng chọn email khác.");
        setLoading(false);
        return;
      }
  
      // Dữ liệu user mới
      const newUser = {
        id: users.length + 1, // ID tạm thời, backend có thể xử lý lại
        name: values.name,
        email: values.email,
        password: values.password,
        address: values.address,
        phone: values.phone,
      };
  
      // Gửi request POST để thêm user mới
      const postResponse = await fetch("http://localhost:9999/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      if (!postResponse.ok) throw new Error("Lỗi khi thêm người dùng!");
  
      // Lấy thông tin user vừa tạo từ phản hồi
      const createdUser = await postResponse.json();
  
      // Dữ liệu user_roles
      const userRole = {
        user_id: createdUser.id, // ID user vừa tạo
        role_id: 2, // Role mặc định là 2
        id: crypto.randomUUID(), // Tạo id ngẫu nhiên
      };
  
      console.log("Dữ liệu user_roles gửi đi:", userRole); // Debug
  
      // Gửi request POST để thêm role cho user mới
      const roleResponse = await fetch("http://localhost:9999/user_roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRole),
      });
  
      if (!roleResponse.ok) throw new Error("Lỗi khi gán quyền cho người dùng!");
  
      message.success("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Lỗi:", error);
      message.error(`Lỗi: ${error.message}`);
    }
  
    setLoading(false);
  };
  

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Đăng Ký</Title>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

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

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ textAlign: "center", display: "block" }}>
          Đã có tài khoản?{" "}
          <a href="/login" style={{ color: "#1890ff" }}>Đăng nhập ngay</a>
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

export default Register;

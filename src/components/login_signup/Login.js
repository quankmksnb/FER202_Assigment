import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9999/users");
      const users = await response.json();

      // Kiểm tra nếu không có email trong cơ sở dữ liệu
      const user = users.find((u) => u.email === values.email);

      // Kiểm tra email không tồn tại
      if (!user) {
        message.error("Email không tồn tại trong hệ thống!");
        setLoading(false); // Đặt loading về false sau khi thông báo lỗi
        return;
      }

      // Kiểm tra mật khẩu của người dùng
      if (user.password !== values.password) {
        message.error("Sai mật khẩu!");
        setLoading(false); // Đặt loading về false sau khi thông báo lỗi
        return;
      }

      // Lấy danh sách quyền người dùng
      const roleUserResponse = await fetch(`http://localhost:9999/user_roles?user_id=${user.id}`);
      const userRoles = await roleUserResponse.json();

      if (userRoles.length > 0) {
        const roleIds = userRoles.map((ur) => String(ur.role_id));

        const roleResponse = await fetch(`http://localhost:9999/roles`);
        const roles = await roleResponse.json();

        const userRolesNames = roles.filter((role) => roleIds.includes(role.id)).map((role) => role.name);

        const userData = { ...user, roles: userRolesNames };
        localStorage.setItem("user", JSON.stringify(userData));

        message.success("Đăng nhập thành công!");
        navigate("/"); // Chuyển đến trang chủ
      } else {
        message.error("Không tìm thấy quyền người dùng!");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Lỗi khi đăng nhập!");
    }
    setLoading(false); // Đảm bảo loading luôn được tắt sau khi kết thúc
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={styles.container}>
      <Row justify="center" align="middle" style={{ width: "100%", height: "100%" }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Đăng Nhập"
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" size="large" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" size="large" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                  style={{
                    borderRadius: 30,
                    backgroundColor: "#1890ff",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>

              {/* Link to Register */}
              <Form.Item>
                <p style={{ textAlign: "center" }}>
                  Chưa có tài khoản?{" "}
                  <a href="/register" style={{ color: "#1890ff" }}>
                    Đăng ký ngay
                  </a>
                </p>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
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
};

export default Login;

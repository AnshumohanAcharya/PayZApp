import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/users";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        message.success(response.message);

        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="bg-white w-400 p-2">
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl">PayZApp - LOGIN</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish} action="POST">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <input
                  className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] outline-none"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input
                  className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] outline-none"
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Item>
            </Col>
          </Row>
          <button
            className="bg-primary p-3 text-white w-full text-xl"
            type="submit"
          >
            Login
          </button>
          <h1
            className="text-md underline mt-2 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Don&apos;t have an account? Register
          </h1>
        </Form>
      </div>
    </div>
  );
};

export default Login;

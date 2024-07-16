import { Col, Form, message, Row } from "antd";
import { registerUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">PayZApp - REGISTER</h1>
        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          Already have an account? Login
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish} action="POST">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Email" name="email">
              <input
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile" name="phoneNumber">
              <input
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationType">
              <select
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option value="National ID">National ID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Social Security Number">
                  Social Security Card (SSN)
                </option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
            >
              <input
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                type="text"
                onChange={(e) => setIdentificationNumber(e.target.value)}
                value={identificationNumber}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
                name="address"
                id=""
                placeholder="Address"
              ></textarea>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-[100%] py-[8px] px-[10px] hover:outline-none"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button
            className="bg-primary text-white py-[8px] px-[20px] text-transform uppercase"
            type="submit"
          >
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;

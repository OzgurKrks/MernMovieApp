import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { register } from "../features/authSlice";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const onFinish = (values) => {
    const checkInputs =
      values.email.includes("@") &&
      values.email.length >= 6 &&
      values.password.length >= 6; //
    dispatch(register(values));
    if (checkInputs) {
      navigate("/login");
      toast.success("Registration successful");
    } else {
      toast.error("Registration failed");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='w-full h-screen  flex justify-center items-center'>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          labelCol={{ span: 24 }}
          label='username'
          name='username'
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label='email'
          name='email'
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label='password'
          name='password'
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button bg-blue-600'
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;

import { Button, Form, Input } from "antd";
import type { LoginFields } from "../app/types";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";

const LoginAntForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (values: LoginFields) => {
    dispatch({ type: "account/login", payload: values });
  };
  const onRegister = () => {
    navigate("/register");
  };

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      requiredMark={false}
      onFinish={onFinish}
      className="w-3/4"
    >
      <Form.Item<LoginFields>
        label="Tên đăng nhập"
        name="name"
        rules={[
          { required: true, message: "Tên đăng nhập không được để trống" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginFields>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Mật khẩu không được để trống" }]}
      >
        <Input.Password />
      </Form.Item>
      <div className="flex w-full justify-evenly pt-5">
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        <Button type="default" htmlType="button" onClick={onRegister}>
          Đăng ký
        </Button>
      </div>
    </Form>
  );
};
export default LoginAntForm;

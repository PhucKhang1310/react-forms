import { Button, ConfigProvider, Form, Input } from "antd";
import type { RegisterFields } from "../app/types";
import { useAppSelector } from "../app/hooks";

interface RegisterAntFormProps {
  onSubmit?: (data: RegisterFields) => void;
  onCancel?: () => void;
}

const RegisterAntForm = ({ onCancel, onSubmit }: RegisterAntFormProps) => {
  const accounts = useAppSelector((state) => state.account.accounts).map(
    (account) => account.email,
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#dcd7c9" } }}>
      <Form
        className="w-90"
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
      >
        <Form.Item<RegisterFields>
          name="name"
          label="Tên tài khoản"
          rules={[
            { required: true, message: "Tên tài khoản không được để trống" },
            {
              pattern: /^[\p{L}\s]+$/u,
              message: "Tên chỉ được chứa chữ cái và khoảng trắng",
            },
          ]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item<RegisterFields>
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email không được để trống" },
            { type: "email", message: "Địa chỉ email không hợp lệ" },
            {
              validator(_, value) {
                if (!value || !accounts.includes(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Email đã tồn tại"));
              },
            },
          ]}
        >
          <Input placeholder="example@mail.com" />
        </Form.Item>
        <Form.Item<RegisterFields>
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Mật khẩu không được để trống" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            {
              pattern: /[a-z]/,
              message: "Mật khẩu phải có ít nhất một chữ thường",
            },
            {
              pattern: /[A-Z]/,
              message: "Mật khẩu phải có ít nhất một chữ hoa",
            },
            { pattern: /\d/, message: "Mật khẩu phải có ít nhất một chữ số" },
            {
              pattern: /[^\w]/,
              message: "Mật khẩu phải có ít nhất một ký tự đặc biệt",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<RegisterFields>
          name="passwordCfm"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Xác nhận mật khẩu không được để trống",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="flex w-full justify-evenly">
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
          <Button type="default" htmlType="button" onClick={onCancel}>
            Hủy
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};
export default RegisterAntForm;

import { Button, Form, Input } from "antd";
import type { EditFields } from "../app/types";
import { useAppSelector } from "../app/hooks";

const EditAntForm = () => {
  const accounts = useAppSelector((select) => select.account.accounts).map(
    (account) => account.email,
  );
  return (
    <Form>
      <Form.Item<EditFields>
        label="Tên tài khoản"
        name="name"
        rules={[
          { required: true, message: "Tên tài khoản không được để trống" },
          {
            pattern: /^[\p{L}\s]+$/u,
            message: "Tên chỉ được chứa chữ cái và khoảng trắng",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<EditFields>
        label="Email"
        name="email"
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
        <Input />
      </Form.Item>
      <Form.Item<EditFields> label="Mật khẩu" name="password">
        <Input readOnly />
      </Form.Item>
      <Form.Item<EditFields>
        label="Mật khẩu mới"
        name="newPassword"
        rules={[
          { required: true, message: "Mật khẩu mới không được để trống" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu mới không được trùng mật khẩu cũ"),
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <div className="flex w-full justify-evenly">
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
        <Button type="default" htmlType="button">
          Hủy
        </Button>
      </div>
    </Form>
  );
};
export default EditAntForm;

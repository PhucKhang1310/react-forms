import { Button, ConfigProvider, Form, Input } from "antd";
import type { EditFields } from "../app/types";
import { useAppSelector } from "../app/hooks";
import PopupOverlay from "./PopupOverlay";

interface EditAntFormProps {
  defaultValues: EditFields;
  onSubmit: (values: EditFields) => void;
  onCancel: () => void;
}

const EditAntForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: EditAntFormProps) => {
  const accounts = useAppSelector((select) => select.account.accounts)
    .map((account) => account.email)
    .filter((email) => email !== defaultValues.email);
  return (
    <PopupOverlay title="Thay đổi thông tin">
      <ConfigProvider theme={{ token: { colorPrimary: "#dcd7c9" } }}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          requiredMark={false}
          onFinish={onSubmit}
          initialValues={defaultValues}
          className="w-100"
        >
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
          <Form.Item<EditFields> label="Mật khẩu cũ" name="password">
            <Input.Password readOnly variant="borderless" />
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
          <Form.Item<EditFields>
            label="Xác nhận mật khẩu mới"
            name="newPasswordCfm"
            dependencies={["newPassword"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div className="flex w-full justify-evenly pt-10">
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
            <Button type="default" htmlType="button" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </PopupOverlay>
  );
};
export default EditAntForm;

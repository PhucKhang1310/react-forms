import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import type { InfoFields } from "../app/types";
import PopupOverlay from "./PopupOverlay";

interface InfoAntFormProps {
  defaultValues: InfoFields;
  onClose: () => void;
  onEdit: () => void;
}

const InfoAntForm = ({ defaultValues, onClose, onEdit }: InfoAntFormProps) => {
  return (
    <PopupOverlay title="Thông tin tài khoản">
      <ConfigProvider theme={{ token: { colorPrimary: "#dcd7c9" } }}>
        <Form
          labelCol={{ span: 10 }}
          labelAlign="left"
          initialValues={defaultValues}
          className="w-100"
        >
          <Form.Item<InfoFields> name="id" label="ID">
            <Input readOnly variant="borderless" />
          </Form.Item>
          <Form.Item<InfoFields> name="name" label="Tên tài khoản">
            <Input readOnly variant="borderless" />
          </Form.Item>
          <Form.Item<InfoFields> name="email" label="Email">
            <Input readOnly variant="borderless" />
          </Form.Item>
          <Form.Item<InfoFields> name="password" label="Mật khẩu">
            <Input.Password readOnly variant="borderless" />
          </Form.Item>
          <Form.Item<InfoFields> name="updatedAt" label="Ngày cập nhật">
            <Input readOnly variant="borderless" />
          </Form.Item>
          <Form.Item<InfoFields> name="status" label="Trạng thái" valuePropName="checked">
            <Checkbox disabled>
              {defaultValues.status ? "Kích hoạt" : "Chưa kích hoạt"}
            </Checkbox>
          </Form.Item>
          <div className="flex w-full justify-evenly pt-5">
            <Button type="primary" htmlType="button" onClick={onEdit}>
              Chỉnh sửa
            </Button>
            <Button type="default" htmlType="button" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </PopupOverlay>
  );
};
export default InfoAntForm;

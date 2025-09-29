import { Button, Form, Input, Select, Tag, type SelectProps } from "antd";
import type { ItemFields } from "../app/types";
import { ITEM_TAGS, type ItemTag } from "../app/itemSlice";

interface ItemFormProps {
  onSubmit: (values: ItemFields) => void;
  initialValues?: ItemFields;
  onClose: () => void;
  label?: string;
}

const tagColorMap: Record<ItemTag, string> = {
  "Đồ uống": "blue",
  "Tạp hóa": "green",
  "Đông lạnh": "cyan",
  "Đồ ăn vặt": "purple",
  Kẹo: "magenta",
};

const options = ITEM_TAGS.map((tag) => ({ value: tag }));

const tagRender: SelectProps["tagRender"] = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={tagColorMap[value as ItemTag]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

const ItemForm = ({ onSubmit, initialValues, onClose, label }: ItemFormProps) => {
  return (
    <Form
      className="w-90 "
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item<ItemFields>
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: "Sản phẩm chưa có tên" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<ItemFields>
        name="price"
        label="Giá"
        rules={[
          { required: true, message: "Sản phẩm chưa có giá" },
          { pattern: /^\d*[0]{3}/, message: "Giá phải là bội của 1000" },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item<ItemFields>
        name="stock"
        label="Số lượng"
        rules={[{ required: true, message: "Sản phẩm phải có số lượng" }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item<ItemFields>
        name="tags"
        label="Thẻ"
        rules={[
          { required: true, message: "Sản phẩm phải có ít nhất một thẻ" },
        ]}
      >
        <Select
          mode="multiple"
          maxCount={3}
          options={options}
          tagRender={tagRender}
        />
      </Form.Item>
      <div className="w-full flex justify-evenly">
        <Button type="primary" htmlType="submit">
          {label}
        </Button>
        <Button type="default" htmlType="button" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </Form>
  );
};
export default ItemForm;

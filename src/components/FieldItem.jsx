// components/FieldItem.jsx
import React from "react";
import { Input, Select, Button, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const FIELD_TYPES = ["nested", "string", "number", "boolean", "float", "objectId"];

export default function FieldItem({
  field,
  level,
  updateField,
  deleteField,
  toggleFieldOptions,
  handleAddNestedField,
}) {
  return (
    <div style={{ marginLeft: level * 20, marginTop: 10 }}>
      <Space direction="horizontal">
        {field.showOptions ? (
          <>
            <Input
              placeholder="Field key"
              value={field.key}
              onChange={(e) => updateField(field.id, "key", e.target.value)}
              style={{ width: 150 }}
            />
            <Select
              value={field.type}
              onChange={(value) => updateField(field.id, "type", value)}
              placeholder="Type"
              style={{ width: 150 }}
            >
              {FIELD_TYPES.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
            <Button icon={<DeleteOutlined />} danger onClick={() => deleteField(field.id)} />
            {field.type === "nested" && (
              <Button type="primary" onClick={() => handleAddNestedField(field.id)}>Add Field</Button>
            )}
          </>
        ) : (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => toggleFieldOptions(field.id)}
          >
            Add Field
          </Button>
        )}
      </Space>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FieldRenderer from "./FieldRenderer";
import { createField, buildJSON } from "../utils/utils.js";
import { v4 as uuid } from 'uuid';


export default function SchemaBuilder() {
  const [fields, setFields] = useState([]);

  const handleAddRoot = () => {
    setFields([...fields, createField()]);
  };

  const updateField = (id, key, value) => {
    const update = (items) =>
      items.map((item) => {
        if (item.id === id) return { ...item, [key]: value };
        return { ...item, children: update(item.children || []) };
      });
    setFields(update(fields));
  };

  const handleAddNestedField = (parentId) => {
  const addToNested = (items) => {
    return items.map((item) => {
      if (item.id === parentId) {
        const newChild = {
          id: uuid(),
          key: "",
          type: "",
          children: [],
          showOptions: true,
        };
        return {
          ...item,
          children: [...item.children, newChild],
        };
      } else if (item.children.length > 0) {
        return {
          ...item,
          children: addToNested(item.children),
        };
      } else {
        return item;
      }
    });
  };

  setFields((prevFields) => addToNested(prevFields));
};


  const deleteField = (id) => {
    const remove = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({ ...item, children: remove(item.children || []) }));
    setFields(remove(fields));
  };

  const toggleFieldOptions = (id) => {
    const toggle = (items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, showOptions: !item.showOptions }
          : { ...item, children: toggle(item.children || []) }
      );
    setFields(toggle(fields));
  };

  const handleSubmit = () => {
    console.log("Final Schema JSON", buildJSON(fields));
    alert("Schema submitted! Check console.");
  };

  return (
    <div style={{ display: "flex", gap: 40, padding: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h2>JSON Schema Builder</h2>
        <Button type="primary" onClick={handleAddRoot} icon={<PlusOutlined />}>
          Add Field Please here
        </Button>
        <div style={{ marginTop: 20 }}>
          <FieldRenderer
            fields={fields}
            level={0}
            updateField={updateField}
            deleteField={deleteField}
            toggleFieldOptions={toggleFieldOptions}
            handleAddNestedField={handleAddNestedField}
          />
        </div>
        <Button type="default" onClick={handleSubmit} style={{ marginTop: 30 }}>
          Submit 
        </Button>
      </div>

      <div style={{ flex: 1 }}>
        <h3>Real-Time JSON Preview</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: 20,
            borderRadius: 6,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {JSON.stringify(buildJSON(fields), null, 2)}
        </pre>
      </div>
    </div>
  );
}

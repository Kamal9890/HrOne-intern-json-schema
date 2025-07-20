// components/FieldRenderer.jsx
import React from "react";
import FieldItem from "./FieldItem";

export default function FieldRenderer({
  fields,
  level,
  updateField,
  deleteField,
  toggleFieldOptions,
  handleAddNestedField,
}) {
  return fields.map((field) => (
    <div key={field.id}>
      <FieldItem
        field={field}
        level={level}
        updateField={updateField}
        deleteField={deleteField}
        toggleFieldOptions={toggleFieldOptions}
        handleAddNestedField={handleAddNestedField}
      />
      {field.type === "nested" && field.children.length > 0 && (
        <FieldRenderer
          fields={field.children}
          level={level + 1}
          updateField={updateField}
          deleteField={deleteField}
          toggleFieldOptions={toggleFieldOptions}
          handleAddNestedField={handleAddNestedField}
        />
      )}
    </div>
  ));
}

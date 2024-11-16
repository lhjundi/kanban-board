import React, { useState } from "react";
import { Input } from "./ui/input";

export const EditableText = ({ text, onSave, onCancel }) => {
  const [value, setValue] = useState(text);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave(value);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = () => {
    if (value !== text) {
      onSave(value);
    } else {
      onCancel();
    }
  };

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
      className="flex-1"
    />
  );
};

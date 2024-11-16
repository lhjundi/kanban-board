import React from "react";
import { Input } from "./ui/input";
import { useEditableText } from "../hooks/useEditableText";

export const EditableText = ({ text, onSave, onCancel }) => {
  const { value, setValue, handleKeyDown, handleBlur } = useEditableText(
    text,
    onSave
  );

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

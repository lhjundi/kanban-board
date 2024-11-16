import { useState } from "react";

export const useEditableText = (initialText, onSave) => {
  const [value, setValue] = useState(initialText);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSave(value);
    } else if (e.key === "Escape") {
      setValue(initialText);
    }
  };

  const handleBlur = () => {
    if (value !== initialText) {
      onSave(value);
    } else {
      setValue(initialText);
    }
  };

  return {
    value,
    setValue,
    handleKeyDown,
    handleBlur,
  };
};

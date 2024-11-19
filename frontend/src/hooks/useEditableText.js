import { useState, useEffect } from "react";

export const useEditableText = (initialText, onSave, onInvalid, onCancel) => {
  const [value, setValue] = useState(initialText);

  useEffect(() => {
    setValue(initialText);
  }, [initialText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!value.trim()) {
        onInvalid();
        return;
      }
      onSave(value);
    } else if (e.key === "Escape") {
      setValue(initialText);
      onCancel();
    }
  };

  const handleBlur = () => {
    if (!value.trim()) {
      onInvalid();
      setValue(initialText);
      return;
    }
    if (value !== initialText) {
      onSave(value);
    } else {
      onCancel();
    }
  };

  return {
    value,
    setValue,
    handleKeyDown,
    handleBlur,
  };
};

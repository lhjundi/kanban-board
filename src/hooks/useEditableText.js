import { useState, useEffect } from "react";

export const useEditableText = (initialText, onSave, onInvalid) => {
  const [value, setValue] = useState(initialText);

  useEffect(() => {
    setValue(initialText);
  }, [initialText]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!value.trim()) {
        onInvalid(); // Chama callback de erro
        return;
      }
      onSave(value);
    } else if (e.key === "Escape") {
      setValue(initialText);
      onSave(initialText);
    }
  };

  const handleBlur = () => {
    if (!value.trim()) {
      onInvalid(); // Chama callback de erro
      setValue(initialText);
      return;
    }
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

import { useState } from "react";

export const useCustomAlert = () => {
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showAlert = ({
    type,
    title,
    message,
    onConfirm,
  }) => {
    setAlert({
      visible: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const hideAlert = () => {
  setAlert({
    visible: false,
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });
};

  return {
    alert,
    showAlert,
    hideAlert,
  };
};
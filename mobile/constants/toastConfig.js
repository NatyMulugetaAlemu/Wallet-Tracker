import ErrorToast from "../components/ErrorToast";

export const toastConfig = {
  error: ({ text1, text2 }) => (
    <ErrorToast
      title={text1}
      message={text2}
    />
  ),
};
import { toast } from "react-toastify";

export const errAlert = (message) => {
  return toast.error(message, {
    position: "top-right",
    autoClose: 2000,
  });
};

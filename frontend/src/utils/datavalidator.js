import { toast } from "react-toastify";

export const validator = (data) => {
  if (!data.name) {
    toast.warning("Name is required");
    return null;
  } else if (!data.sector) {
    toast.warning("sector is required");
    return null;
  } else if (data.agreed === false) {
    toast.warning("you should agrree to terms and conditions");
    return null;
  } else {
    return data;
  }
};

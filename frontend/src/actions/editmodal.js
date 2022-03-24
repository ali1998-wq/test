import { editmodalconstants } from "./constants";

export const openaddcat = (open, value, name, id) => {
  return async (disptach) => {
    disptach({ type: editmodalconstants.editmodalrequest });

    disptach({
      type: editmodalconstants.editmodalSuccess,
      payload: {
        open,
        value,
        name,
        id,
      },
    });
  };
};

import React, { useState } from "react";
import "../sass/modal.scss";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { openaddcat } from "../actions/editmodal";
import { Editsec } from "../actions/editsector";
import { getSec } from "../actions/getdeals";
import { getSubSec } from "../actions/getsubsectors";
import { toast } from "react-toastify";

function EditModal() {
  const dispatch = useDispatch();
  const openMod = useSelector((state) => state.openMod);
  const [val, setval] = useState();
  const [def, setdef] = useState();
  useState(() => {
    if (openMod) {
      setval(openMod?.value);
    }
  }, [openMod]);
  console.log(val);
  const handlesave = () => {
    const data = {
      id: openMod?.id,
      name: openMod?.name,
      value: val,
    };
    dispatch(Editsec(data)).then((res) => {
      const message = localStorage.getItem("message");
      if (
        message === "sector updated successfully" ||
        message === "subsector updated successfully"
      ) {
        dispatch(getSec());
        dispatch(getSubSec());
        dispatch(openaddcat(false));
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };
  return (
    <div className="editmodal__main">
      <div className="editmodal__main__inner">
        <i className="back" onClick={() => dispatch(openaddcat(false))}>
          <BsArrowLeft />
        </i>
        <p className="title">Edit {openMod?.name}</p>
        <div className="input__div">
          <input
            placeholder="sector"
            value={val}
            onChange={(e) => setval(e.target.value)}
          ></input>
          <button onClick={handlesave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

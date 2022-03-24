import React, { useEffect, useState } from "react";
import "../sass/index.scss";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getSec } from "../actions/getdeals";
import { getSubSec } from "../actions/getsubsectors";
import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import { validator } from "../utils/datavalidator";
import { toast, ToastContainer } from "react-toastify";
import { AddData } from "../actions/adddata";
import { getUs } from "../actions/getusers";

function Index() {
  const id = window.sessionStorage.getItem("testId");
  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      color: state.isSelected ? "white" : "black",
      padding: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: "100%",
      background: "white",
      borderRadius: "10px",
      display: "flex",
      height: "35px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 30ms";

      return { ...provided, opacity, transition };
    },
    container: (provided, state) => ({
      ...provided,

      display: "flex",
      height: "35px",
      borderRadius: "10px",
      backgoundColor: "green !important",
      color: "white",

      margin: "0 0px",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSec());
    dispatch(getSubSec());
    if (id) {
      dispatch(getUs(id));
    }
  }, []);
  const [sectors, setsectors] = useState();
  const [subsectors, setsubsectors] = useState();
  const [sctor, setsector] = useState();
  const DealsGet = useSelector((state) => state.DealsGet);
  const SubGet = useSelector((state) => state.SubGet);
  const UseGet = useSelector((state) => state.UseGet);

  useEffect(() => {
    if (DealsGet?.data && SubGet?.data) {
      if (UseGet?.data) {
        setname(UseGet?.data?.name);
        DealsGet?.data?.map((dat) => {
          if (dat._id == UseGet?.data?.sector) {
            setsector({
              label: dat.name,
              value: dat._id,
            });
          }
        });
        SubGet?.data?.map((dat) => {
          if (dat?._id === UseGet?.data?.subsector) {
            setsubsect({
              label: dat.name,
              value: dat._id,
            });
          }
        });
        setagreed(UseGet?.data?.agreed);
      }
    }
  }, [UseGet, DealsGet, SubGet]);

  useEffect(() => {
    if (DealsGet?.data) {
      let sector = [];
      DealsGet?.data?.map((sec) => {
        sector.push({
          label: sec.name,
          value: sec._id,
        });
      });
      setsectors(sector);
    }
  }, [DealsGet]);
  useEffect(() => {
    if (sctor) {
      let subsec = [];
      SubGet?.data?.map((sub) => {
        if (sub.sector._id === sctor?.value) {
          subsec.push({
            label: sub.name,
            value: sub._id,
          });
        }
      });
      setsubsectors(subsec);
    }
  }, [sctor, SubGet?.data]);
  const Navigate = useNavigate();
  //////////////////data states/////////////
  const [name, setname] = useState();
  const [subsect, setsubsect] = useState();
  const [aggreed, setagreed] = useState(false);

  ////////////checkbox handle
  const handleagree = () => {
    if (aggreed === true) {
      setagreed(false);
    } else {
      setagreed(true);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!id) {
      let id = shortid.generate();
      window.sessionStorage.setItem("testId", id);
      const data = {
        id: id,
        name: name,
        sector: sctor.value,
        ...(subsect && { subsector: subsect.value }),
        agreed: aggreed,
      };
      const dat = validator(data);
      console.log(dat);
      if (dat !== null) {
        dispatch(AddData(data)).then((res) => {
          const message = localStorage.getItem("message");
          if (message === "user created successfully") {
            toast.success("data saved sucssfully");
          } else {
            toast.error(message);
          }
        });
      }
    } else if (id) {
      const data = {
        id: id,
        name: name,
        sector: sctor.value,
        ...(subsect && { subsector: subsect.value }),
        agreed: aggreed,
      };
      console.log(data);
      const dat = validator(data);
      console.log(dat);
      if (dat !== null) {
        dispatch(AddData(data)).then((res) => {
          const message = localStorage.getItem("message");
          if (message === "user updated") {
            dispatch(getUs(id));
            toast.success("data updated sucssfully");
          } else {
            toast.error(message);
          }
        });
      }
    }
  };
  console.log(sctor, subsect);

  return (
    <>
      <div className="index__main">
        <div className="index__main__inner">
          <h3 className="title">
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h3>
          <form>
            <div className="form__box">
              <label>Name</label>
              <input
                placeholder="Your name...."
                value={name}
                onChange={(e) => setname(e.target.value)}
              ></input>
            </div>
            <div className="form__box">
              <label>Sector</label>
              <Select
                placeholder="Select sector ...."
                styles={customStyles}
                options={sectors}
                onChange={setsector}
                value={sctor}
              ></Select>
            </div>
            {sctor && (
              <div className="form__box">
                <label>Sub-Sector (optional)</label>
                <Select
                  placeholder="Select sub-sector ...."
                  styles={customStyles}
                  options={subsectors}
                  onChange={setsubsect}
                  value={subsect}
                ></Select>
              </div>
            )}
            <div className="checkbox__div">
              <input
                type="checkbox"
                checked={aggreed}
                onChange={handleagree}
                defaultChecked={aggreed === true ? true : false}
              ></input>
              <label>Agree to terms and services</label>
            </div>
            <div className="button__div">
              <button onClick={handlesubmit}>Save</button>
              <button onClick={() => Navigate("edtisector")}>
                Edit sectors
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;

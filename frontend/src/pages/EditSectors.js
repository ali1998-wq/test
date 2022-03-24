import React, { useEffect, useMemo } from "react";
import "../sass/editsector.scss";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import { getSec } from "../actions/getdeals";
import { getSubSec } from "../actions/getsubsectors";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EditModal from "../modal/EditModal";
import { openaddcat } from "../actions/editmodal";

function EditSectors() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSec());
    dispatch(getSubSec());
  }, []);

  const handlesector = (id, name) => {
    dispatch(openaddcat(true, name, "sector", id));
  };
  const handlesubsector = (id, name) => {
    dispatch(openaddcat(true, name, "subsector", id));
  };

  const DealsGet = useSelector((state) => state.DealsGet);
  const SubGet = useSelector((state) => state.SubGet);
  const datq = useMemo(() => DealsGet?.data, [DealsGet?.data]);
  const subsector = useMemo(() => SubGet?.data, [SubGet?.data]);
  const dat = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        render: (row) => {
          return (
            <p style={{ fontFamily: "Lato", fontWeight: "bold" }}>
              {row?.name}
            </p>
          );
        },
      },

      {
        title: "Edit",
        field: "name",
        render: (row) => {
          return (
            <i
              style={{ fontSize: "22px", color: "red", cursor: "pointer" }}
              onClick={() => handlesector(row._id, row.name)}
            >
              <AiTwotoneEdit />
            </i>
          );
        },
      },
    ],
    [DealsGet?.data]
  );
  const datw = useMemo(
    () => [
      {
        title: "Name",
        field: "name",
        render: (row) => {
          return (
            <p style={{ fontFamily: "Lato", fontWeight: "bold" }}>
              {row?.name}
            </p>
          );
        },
      },

      {
        title: "Edit",
        field: "name",
        render: (row) => {
          return (
            <i
              style={{ fontSize: "22px", color: "red", cursor: "pointer" }}
              onClick={() => handlesubsector(row._id, row.name)}
            >
              <AiTwotoneEdit />
            </i>
          );
        },
      },
    ],
    [SubGet?.data]
  );
  const Naviagte = useNavigate();
  const openMod = useSelector((state) => state.openMod);
  return (
    <>
      <div className="editsector__main">
        <div className="editsector__main__inner">
          <i className="back__arrow" onClick={() => Naviagte("/")}>
            <BsArrowLeft />
          </i>
          <div className="tables__div">
            <div>
              <MaterialTable
                title="Sectors"
                columns={dat}
                data={datq}
                options={{
                  paging: true,
                  pageSize: 3, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [3, 12, 20, 50],
                  selection: true, // rows selection options
                }}
              />
            </div>
            <div>
              <MaterialTable
                title="Sub-Sectors"
                columns={datw}
                data={subsector}
                options={{
                  paging: true,
                  pageSize: 3, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [3, 12, 20, 50],
                  selection: true, // rows selection options
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {openMod.open && <EditModal />}
    </>
  );
}

export default EditSectors;

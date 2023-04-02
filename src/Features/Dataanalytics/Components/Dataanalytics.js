import React, { useState, useEffect } from "react";
import { BsCalendarWeekFill } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import Table from "./Table";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Appdata, Appnames } from "../services/Api/appRequests";
import { getappdate, getstatus } from "../services/Slice/appSlive";
import Spinner from "./Spinner";
import Error from "./Error";
import DateModel from "./DateModel";
import TableSetting from "./TableSetting";
const Dataanalytics = () => {
  const dispatch = useDispatch();
  const [SearchParams] = useSearchParams();
  // const appdata = useSelector(getappdate)
  const status = useSelector(getstatus);

  const [showsettings, setShowsetting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (SearchParams.get("From") !== "" && SearchParams.get("To") !== "") {
      dispatch(Appnames());
      dispatch(
        Appdata({
          From: SearchParams.get("From"),
          To: SearchParams.get("To"),
        }),
      );
    }
  }, [SearchParams, dispatch]);

  return (
    <div className="lg:px-8 md:px-6 sm:px-4 px-2">
      <div className=" flex justify-between  py-4">
        <button
          type="button"
          class="text-gray-900  border border-gray-900 flex   rounded-lg text-sm px-5 py-2.5  "
          onClick={() => setShowModal(true)}
        >
          <BsCalendarWeekFill className="flex text-blue-700  justify-center items-center mx-1 my-1" />
          <span>
            {" "}
            {SearchParams.get("From")} - {SearchParams.get("To")}
          </span>
        </button>
        {showModal && <DateModel setShowModal={setShowModal} />}
        <button
          type="button"
          class="text-gray-900  border border-gray-900 flex font-mono rounded-lg text-sm px-5 py-2.5"
          onClick={() => setShowsetting(!showsettings)}
        >
          <VscSettings className="flex justify-center text-blue-700 items-center mx-1 my-1" />
          <span className=""> Setting</span>
        </button>
      </div>

      {showsettings && <TableSetting setShowsetting={setShowsetting} />}
      {status === "loading" && <Spinner />}
      {status === "successful" && <Table />}
      {status === "failed" && <Error />}
    </div>
  );
};

export default Dataanalytics;

import React, { useState } from "react";

import { useNavigate, createSearchParams } from "react-router-dom";

const Datapickerform = ({ onEndAction }) => {
  let navigate = useNavigate();
  const [fromdate, setFromdate] = useState("");
  const [whendate, setwhendate] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (fromdate !== "" && whendate !== "" && fromdate !== whendate) {
      navigate({
        pathname: "/analytic",
        search: createSearchParams({
          From: fromdate,
          To: whendate,
        }).toString(),
      });
    }
    onEndAction();
  };

  return (
    <div>
      <div class=" mb-4">
        <label
          for="App"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {" "}
          Date :-
        </label>
        <div class="flex items-center  mb-4">
          <input
            name="start"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-5 p-2.5   dark:placeholder-gray-400 "
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              setFromdate(e.target.value);
            }}
            placeholder="Select date start"
          />

          <span class="mx-4 text-gray-400">to</span>

          <input
            name="end"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-5 p-2.5   dark:placeholder-gray-400 "
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              setwhendate(e.target.value);
            }}
            placeholder="Select date end"
          />
        </div>
      </div>

      <button
        type="button"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  rounded-lg mb-4 px-5 py-2.5 font-mono text-lg w-full"
        onClick={handlesubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Datapickerform;

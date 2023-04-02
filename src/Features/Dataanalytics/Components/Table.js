import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcol } from "../services/Slice/colSlice";
import Tablerow from "./Tablerow";
import {
  getappname,
  getappdata,
  getMaxReq,
  getMaxRes,
} from "../services/Slice/appSlive";
import { FaFilter } from "react-icons/fa";
import _ from "lodash";

const Table = () => {
  const appdata = useSelector(getappdata);
  const appname = useSelector(getappname);
  const maxReqValue = useSelector(getMaxReq);
  const maxResValue = useSelector(getMaxRes);
  const coloums = useSelector(getcol);
  const [namefilter, Setnamefilter] = useState(false);
  const [requestrangefilter, Setrequestrangefilter] = useState(false);
  const [requestranagevalue, setReqRanValue] = useState(0);
  const [responserangefilter, setResponserangefilter] = useState(false);
  const [responcerangevalue, setResRanValue] = useState(0);

  const [fname, Setfname] = useState("");

  function appdatareducer(state, action) {
    switch (action.type) {
      case "SearchByAppname":
        return _.filter(appdata, (item) => item["name"] === action.Search);
      case "SearchByRangeofReq":
        return _.filter(appdata, (item) => item["requests"] < action.requests);
      case "SearchByRangeofRes":
        return _.filter(
          appdata,
          (item) => item["responses"] < action.responses,
        );
      case "Reset":
        return appdata;
      default:
        throw appdata;
    }
  }
  // requests responses
  const [filteredappdata, appdatadispatch] = useReducer(
    appdatareducer,
    appdata,
  );

  function appnamereducer(state, action) {
    switch (action.type) {
      case "SearchByAppname":
        return _.filter(appname, (item) =>
          item["app_name"].includes(action.Search),
        );
      case "Reset":
        return appname;
      default:
        throw appname;
    }
  }
  // 5:47
  const [filteredappname, appnamedispatch] = useReducer(
    appnamereducer,
    appname,
  );

  return (
    <div class="overflow-x-auto relative shadow-md rounded-lg my-4">
      <table class="w-full text-sm text-left text-gray-600 ">
        <thead class="text-xs text-gray-800 uppercase bg-gray-50 ">
          <tr>
            {coloums.map((item) => {
              return (
                <>
                  {item.show && (
                    <th scope="col" class="py-3 px-6 relative">
                      <div
                        className=" flex flex-col items-center "
                        onClick={() => {
                          if (item.colname === "App Name") {
                            Setnamefilter((preState) => !preState);
                          }
                          if (item.colname === "AD Request") {
                            Setrequestrangefilter((preState) => !preState);
                          }
                          if (item.colname === "AD Response") {
                            setResponserangefilter((preState) => !preState);
                          }
                        }}
                      >
                        <FaFilter className="my-1 mx-1" />
                        <span className=" cursor-pointer">{item.colname}</span>
                      </div>

                      {item.colname === "App Name" && namefilter && (
                        <div
                          id="dropdownTop"
                          class=" absolute top-12 z-10  bg-white rounded divide-y divide-gray-100 shadow "
                        >
                          <ul class="py-1 text-sm text-gray-700 ">
                            <li className="p-2">
                              <input
                                type="text"
                                className="text-gray-900  rounded-lg  p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search App Name"
                                onChange={(event) =>
                                  appnamedispatch({
                                    type: "SearchByAppname",
                                    Search: event.target.value,
                                  })
                                }
                              />
                            </li>

                            {filteredappname.map((item) => {
                              return (
                                <button
                                  className="w-full block py-2 px-4 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                                  onClick={() => {
                                    Setfname(item.app_name);
                                  }}
                                >
                                  {item.app_name}
                                </button>
                              );
                            })}

                            <li className="p-2 flex justify-end">
                              <button
                                className="p-2   mx-2 font-mono text-red-700"
                                onClick={() => {
                                  appdatadispatch({
                                    type: "Reset",
                                  });
                                  Setnamefilter(false);
                                }}
                              >
                                Reset
                              </button>
                              <button
                                className="p-2 border rounded-lg mx-2 font-mono border-blue-700 hover:bg-blue-700 hover:text-white"
                                onClick={() => {
                                  appdatadispatch({
                                    type: "SearchByAppname",
                                    Search: fname,
                                  });
                                  appnamedispatch({
                                    type: "Reset",
                                  });
                                  Setnamefilter(false);
                                }}
                              >
                                Apply
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}

                      {item.colname === "AD Request" && requestrangefilter && (
                        <div
                          id="dropdownTop"
                          class=" absolute top-12 z-10  bg-white rounded divide-y divide-gray-100 shadow"
                        >
                          <div class="p-2 text-sm text-gray-900 ">
                            <li className="p-2 flex justify-between items-start">
                              <div className="p-2">{requestranagevalue}</div>
                              <input
                                type="range"
                                min="0"
                                max={`${maxReqValue}`}
                                className="p-2"
                                value={requestranagevalue}
                                onChange={(event) =>
                                  setReqRanValue(event.target.value)
                                }
                              />
                              <div className="p-2">{maxReqValue}</div>
                            </li>

                            <li className="p-2 flex justify-end">
                              <button
                                className="p-2   mx-2 font-mono text-red-700"
                                onClick={() => {
                                  appdatadispatch({
                                    type: "Reset",
                                  });
                                  Setrequestrangefilter(false);
                                }}
                              >
                                Reset
                              </button>
                              <button
                                className="p-2 border rounded-lg mx-2 font-mono border-blue-700 hover:bg-blue-700 hover:text-white"
                                onClick={() => {
                                  appdatadispatch({
                                    type: "SearchByRangeofReq",
                                    requests: requestranagevalue,
                                  });
                                  Setrequestrangefilter(false);
                                }}
                              >
                                Apply
                              </button>
                            </li>
                          </div>
                        </div>
                      )}

                      {item.colname === "AD Response" &&
                        responserangefilter && (
                          <div
                            id="dropdownTop"
                            class=" absolute top-12 z-10  bg-white rounded divide-y divide-gray-100 shadow"
                          >
                            <div class="p-2 text-sm text-gray-900 ">
                              <li className="p-2 flex justify-between items-start">
                                <div className="p-2">{responcerangevalue}</div>
                                <input
                                  type="range"
                                  min="0"
                                  max={`${maxResValue}`}
                                  className="p-2"
                                  value={responcerangevalue}
                                  onChange={(event) =>
                                    setResRanValue(event.target.value)
                                  }
                                />
                                <div className="p-2">{maxResValue}</div>
                              </li>

                              <li className="p-2 flex justify-end">
                                <button
                                  className="p-2   mx-2 font-mono text-red-700"
                                  onClick={() => {
                                    appdatadispatch({
                                      type: "Reset",
                                    });
                                    setResponserangefilter(false);
                                  }}
                                >
                                  Reset
                                </button>
                                <button
                                  className="p-2 border rounded-lg mx-2 font-mono border-blue-700 hover:bg-blue-700 hover:text-white"
                                  onClick={() => {
                                    appdatadispatch({
                                      type: "SearchByRangeofRes",
                                      responses: responcerangevalue,
                                    });
                                    setResponserangefilter(false);
                                  }}
                                >
                                  Apply
                                </button>
                              </li>
                            </div>
                          </div>
                        )}
                    </th>
                  )}
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {filteredappdata.map((item) => {
            return <Tablerow dataitem={item} col={coloums} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

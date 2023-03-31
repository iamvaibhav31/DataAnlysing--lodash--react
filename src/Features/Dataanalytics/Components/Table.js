import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcol } from "../services/Slice/colSlice";
import Tablerow from "./Tablerow";
import { getappname, getappdata } from "../services/Slice/appSlive";
import { FaFilter } from "react-icons/fa";
import _ from "lodash";

const Table = () => {
  const appdata = useSelector(getappdata);
  const appname = useSelector(getappname);
  const coloums = useSelector(getcol);
  const [namefilter, Setnamefilter] = useState(false);
  const [requestrangefilter, Setrequestrangefilter] = useState(false);
  const [search, SetSearch] = useState("");
  const [fname, Setfname] = useState("");

  function appdatareducer(state, action) {
    switch (action.type) {
      case "SearchByAppname":
        return _.filter(appdata, (item) => item["name"] === action.Search);
      case "Reset":
        return appdata;
      default:
        throw appdata;
    }
  }
  const [filteredappdata, appdatadispatch] = useReducer(
    appdatareducer,
    appdata,
  );

  function appnamereducer(state, action) {
    switch (action.type) {
      case "SearchByAppname":
        return _.filter(appname, (item) => item["app_name"] === action.Search);

      default:
        throw appname;
    }
  }
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
                        className=" flex  items-center"
                        onClick={() => {
                          if (item.colname === "App Name") {
                            Setnamefilter(!namefilter);
                          }
                          if (item.colname === "AD Request") {
                            Setrequestrangefilter(!requestrangefilter);
                          }
                        }}
                      >
                        <FaFilter className="my-1 mx-1" />
                        <span>{item.colname}</span>
                      </div>

                      {item.colname === "App Name" && namefilter && (
                        <div
                          id="dropdownTop"
                          class=" absolute top-12 z-10  bg-white rounded divide-y divide-gray-100 shadow "
                        >
                          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li className="p-2">
                              <input
                                type="text"
                                className="text-gray-900  rounded-lg  p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search App Name"
                                value={search}
                                onChange={(event) =>
                                  SetSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" && search !== "") {
                                    appnamedispatch({
                                      type: "SearchByAppname",
                                      Search: search,
                                    });
                                  }
                                }}
                              />
                            </li>

                            {filteredappname.map((item) => {
                              return (
                                <button
                                  className="w-full block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                                className="p-2 border rounded-lg mx-2 font-mono border-blue-700 hover:bg-blue-700"
                                onClick={() => {
                                  appdatadispatch({
                                    type: "SearchByAppname",
                                    Search: fname,
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
                          class=" absolute top-12 z-10  bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul class="p-2 text-sm text-gray-700 dark:text-gray-200">
                            <li className="p-2">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                className="p-2"
                                // value={value}
                                // onChange={event => setValue(event.target.value)}
                              />
                            </li>

                            <li className="p-2 flex justify-end">
                              <button className="p-2   mx-2 font-mono text-red-700">
                                Reset
                              </button>
                              <button className="p-2 border rounded-lg mx-2 font-mono border-blue-700 hover:bg-blue-700">
                                Apply
                              </button>
                            </li>
                          </ul>
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

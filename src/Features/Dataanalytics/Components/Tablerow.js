import React from "react";
import _ from "lodash";
const Tablerow = ({ dataitem, col }) => {
  const datarep = (name, data) => {
    if (name === "fillrate" || name === "ctr") {
      return `${_.round(data)}%`;
    } else {
      return `${data}`;
    }
  };
  return (
    <tr class="bg-white border-b  hover:bg-gray-50 ">
      {col.map((item) => {
        return (
          <>
            {item.show && (
              <td class="py-4 px-6">
                {datarep(item.name_id, dataitem[item.name_id])}
              </td>
            )}
          </>
        );
      })}
    </tr>
  );
};

export default Tablerow;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcol, hidecol, dndRedu } from "../services/Slice/colSlice";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableSettingButton from "./TableSettingButton";
const TableSetting = ({ setShowsetting }) => {
  const dispatch = useDispatch();
  const coloums = useSelector(getcol);

  const [hidcolname, setHideColName] = useState([]);
  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    dispatch(dndRedu({ active: active.id, over: over.id }));
  };
  console.log(hidcolname);
  return (
    <DndContext
      className=" my-4 mb-8 border-2 border-gray-200 shadow-lg rounded-2xl p-8 "
      collisionDetection={closestCenter}
      onDragEnd={handleOnDragEnd}
    >
      <div>
        <SortableContext
          items={coloums}
          strategy={horizontalListSortingStrategy}
        >
          {coloums.map((item, index) => {
            return (
              <TableSettingButton
                index={index}
                item={item}
                onClick={() => {
                  if (!hidcolname.includes(item.colname)) {
                    setHideColName((prev) => [...prev, item.colname]);
                  }
                }}
              />
            );
          })}
        </SortableContext>
        <div className="flex justify-end p-2">
          <button
            className="p-2 border-2 border-gray-200   font-mono hover:shadow-lg rounded-lg mx-2"
            onClick={() => setShowsetting(false)}
          >
            Close
          </button>
          <button
            className="p-2 border-2 border-blue-300   font-mono hover:shadow-lg rounded-lg mx-2"
            onClick={() => {
              dispatch(hidecol(hidcolname));
            }}
          >
            Apply Change
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default TableSetting;

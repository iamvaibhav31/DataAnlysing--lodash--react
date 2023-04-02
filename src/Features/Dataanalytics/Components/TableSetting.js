import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getcol, dndRedu, reset } from "../services/Slice/colSlice";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableSettingButton from "./TableSettingButton";
const TableSetting = ({ setShowsetting }) => {
  const dispatch = useDispatch();
  const coloums = useSelector(getcol);
  const handleOnDragEnd = (event) => {
    const { active, over } = event;
    dispatch(dndRedu({ active: active.id, over: over.id }));
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
      <div className=" my-4 mb-8 border-2 border-gray-200 shadow-md rounded-2xl p-8 ">
        <SortableContext
          items={coloums}
          strategy={horizontalListSortingStrategy}
        >
          {coloums.map((item, index) => {
            return <TableSettingButton index={index} item={item} />;
          })}
        </SortableContext>
        <div className="flex justify-end p-2">
          <button
            className="p-2 font-mono text-red-700 mx-2"
            onClick={() => {
              dispatch(reset());
            }}
          >
            Reset
          </button>
          <button
            className="p-2 border-2 border-gray-200   font-mono hover:shadow-lg rounded-lg mx-2"
            onClick={() => setShowsetting(false)}
          >
            Close
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default TableSetting;

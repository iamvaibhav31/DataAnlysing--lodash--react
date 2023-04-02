import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TableSettingButton = ({ item, index }) => {
  const lborder = item.show ? "border-l-4 border-l-blue-600" : "";
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index,
    });
  return (
    <button
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className={`px-4 py-2 border-2 border-gray-200 ${lborder} font-mono hover:shadow-lg rounded-md m-4`}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      {item.colname}
    </button>
  );
};

export default TableSettingButton;

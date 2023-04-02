import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
const initialState = {
  colnames: [
    {
      id: 1,
      name_id: "date",
      colname: "Date",
      show: true,
    },
    {
      id: 2,
      name_id: "name",
      colname: "App Name",
      show: true,
    },
    {
      id: 3,
      name_id: "requests",
      colname: "AD Request",
      show: true,
    },
    {
      id: 4,
      name_id: "responses",
      colname: "AD Response",
      show: true,
    },
    {
      id: 5,
      name_id: "impressions",
      colname: "Impressions",
      show: true,
    },
    {
      id: 6,
      name_id: "clicks",
      colname: "Clicks",
      show: true,
    },
    {
      id: 7,
      name_id: "revenue",
      colname: "Revenue",
      show: true,
    },
    {
      id: 8,
      name_id: "fillrate",
      colname: "Fill Rate",
      show: true,
    },
    {
      id: 9,
      name_id: "ctr",
      colname: "CTR",
      show: false,
    },
  ],
};

export const colSlice = createSlice({
  name: "AddName",
  initialState,
  reducers: {
    dndRedu: (state, action) => {
      let updatecol = [];
      const { active, over } = action.payload;
      if (active !== over) {
        updatecol = arrayMove(state.colnames, active, over);
      } else {
        updatecol = state.colnames.map((item, index) => {
          if (index === active) {
            return {
              ...item,
              show: !item.show,
            };
          } else {
            return item;
          }
        });
      }
      state.colnames = updatecol;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { hidecol, dndRedu, reset, hidecol2 } = colSlice.actions;
export const getcol = (state) => state.colslice.colnames;

export default colSlice.reducer;

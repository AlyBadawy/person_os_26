import { WeightUnitEnum } from "@/dashboardApp/types/WeightUnits";
import { createSlice } from "@reduxjs/toolkit";

export const UnitsSlice = createSlice({
  name: "units",
  initialState: {
    weightUnit: WeightUnitEnum.Kilograms,
  },
  reducers: {
    setWeightUnit: (state, action: { payload: WeightUnitEnum }) => {
      state.weightUnit = action.payload;
    },
  },
});

export const { setWeightUnit } = UnitsSlice.actions;

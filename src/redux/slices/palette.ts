import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaletteName } from "src/constants";

export const { actions: paletteActions, reducer: paletteReducer } = createSlice({
  name: "palette",
  initialState: { name: "Ravenbridge" as PaletteName },
  reducers: {
    setPalette: (state, { payload: name }: PayloadAction<PaletteName>) => ({ ...state, name })
  }
});

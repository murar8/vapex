import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultMaterials from "src/data/materials.json";

export type CoilMaterial = {
  name: string;
  /** `Ωmm² / m` */
  resistivity: number;
};

export type CoilPageState = {
  materials: CoilMaterial[];
  material: number;

  arrangement?: "parallel" | "serial";
  /** Positive Integer */
  quantity: number;

  /** `mm` */
  width?: number;
  /** `mm` */
  thickness?: number;
  /** `mm` */
  diameter?: number;

  /** `mm` */
  legLength: number;
  /** `mm` */
  innerDiameter: number;

  /** Positive Integer */
  parallelQuantity: number;
  /** Positive Number */
  pitch: number;
};

export const initialState: CoilPageState = {
  materials: defaultMaterials,
  material: 0,

  arrangement: undefined,
  quantity: 1,

  legLength: 3,
  innerDiameter: 1.25,

  diameter: 0.32,

  parallelQuantity: 1,
  pitch: 0
};

const setProperty = <T, K extends keyof T>(prop: K) => (state: T, action: PayloadAction<T[K]>) => ({
  ...state,
  [prop]: action.payload
});

export const { actions: coilPageActions, reducer: coilPageReducer } = createSlice({
  name: "coilPage",
  initialState,
  reducers: {
    setMaterial: setProperty("material"),

    setArrangement: (state, { payload: arrangement }: PayloadAction<"parallel" | "serial">) => ({
      ...state,
      arrangement
    }),

    setQuantity: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      arrangement: payload > 1 ? state.arrangement || "parallel" : undefined,
      quantity: payload
    }),

    setLegLength: setProperty("legLength"),

    setInnerDiameter: setProperty("innerDiameter"),

    setDiameter: ({ width, thickness, ...state }, { payload }: PayloadAction<number>) => ({
      ...state,
      diameter: payload
    }),

    setWidth: ({ diameter, ...state }, { payload }: PayloadAction<number>) => ({
      ...state,
      width: payload
    }),

    setThickness: ({ diameter, ...state }, { payload }: PayloadAction<number>) => ({
      ...state,
      thickness: payload
    }),

    setParallelQuantity: setProperty("parallelQuantity"),

    setPitch: setProperty("pitch")
  }
});

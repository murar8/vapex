import * as Yup from "yup";

const number = Yup.number()
  .moreThan(0)
  .required();

const integer = number.integer();

export const coilPageSchema = Yup.object({
  quantity: integer,
  legLength: number,
  innerDiameter: number,
  material: integer,
  profile: Yup.mixed().oneOf([
    Yup.object({ diameter: number }),
    Yup.object({ width: number, thickness: number })
  ]),
  parallelQuantity: number,
  pitch: number
});

export type CoilPageSchema = Yup.InferType<typeof coilPageSchema>;

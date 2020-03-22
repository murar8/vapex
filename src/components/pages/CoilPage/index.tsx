import { Formik } from "formik";
import React from "react";
import { GroupArray } from "src/components/base/Group";
import { ArrangementForm } from "./ArrangementForm";
import { DimensionForm } from "./DimensionForm";
import { MaterialForm } from "./MaterialForm";
import { ProfileForm } from "./ProfileForm";
import { coilPageSchema } from "./schema";
import { TypeForm } from "./TypeForm";

export const initialState = {
  quantity: "",
  arrangement: "",
  legLength: "",
  innerDiameter: "",
  material: "",
  profile: "round",
  diameter: "",
  width: "",
  thickness: "",
  type: "single",
  parallelQuantity: "",
  twistPitch: ""
};

export const CoilPageForm = () => {
  return (
    <GroupArray>
      <ArrangementForm />
      <TypeForm />
      <DimensionForm />
      <MaterialForm />
      <ProfileForm />
    </GroupArray>
  );
};

export const CoilPage = () => (
  <Formik initialValues={initialState} validationSchema={coilPageSchema} onSubmit={() => {}}>
    {CoilPageForm}
  </Formik>
);

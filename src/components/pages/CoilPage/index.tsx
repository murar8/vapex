import { Box, Grid, makeStyles } from "@material-ui/core";
import { Formik, FormikProps } from "formik";
import React from "react";
import { defineMessages } from "react-intl";
import { coilPageSchema } from "./schema";
import { ArrangementForm } from "./ArrangementForm";
import { TypeForm } from "./TypeForm";
import { MaterialForm } from "./MaterialForm";
import { DimensionForm } from "./DimensionForm";
import { ProfileForm } from "./ProfileForm";

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

const useStyles = makeStyles(({ spacing }) => ({ root: { padding: spacing(1) } }));

export const CoilPageForm = () => {
  const { root } = useStyles();

  return (
    <Grid container spacing={0} className={root}>
      <ArrangementForm />
      <TypeForm />
      <DimensionForm />
      <MaterialForm />
      <ProfileForm />
    </Grid>
  );
};

export const CoilPage = () => (
  <Formik initialValues={initialState} validationSchema={coilPageSchema} onSubmit={() => {}}>
    {CoilPageForm}
  </Formik>
);

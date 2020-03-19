import { Box, Grid, MenuItem } from "@material-ui/core";
import React from "react";
import { defineMessages } from "react-intl";
import { connect, ConnectedProps } from "react-redux";
import { IntegerInput } from "src/components/base/IntegerInput";
import { RadioElement, RadioSet } from "src/components/base/RadioSet";
import { SelectInput } from "src/components/base/SelectInput";
import { coilPageActions } from "src/redux/actions";
import { RootState } from "src/redux/store";
import { useFormatMessage } from "src/util/hooks";
import { CoilPageState } from "src/redux/slices/coilPage";
import defaultMaterials from "src/data/materials.json";
import { reduxForm, Field } from "redux-form";

const messages = defineMessages({
  title: { id: "coilpage.title", defaultMessage: "Coil Calculator" },
  quantity: { id: "coilpage.quantity", defaultMessage: "Number of Coils" },
  arrangement: { id: "coilpage.arrangement", defaultMessage: "Arrangement" },
  parallel: { id: "coilpage.parallel", defaultMessage: "Parallel" },
  serial: { id: "coilpage.serial", defaultMessage: "Serial" },
  diameter: { id: "coilpage.diameter", defaultMessage: "Diameter" },
  width: { id: "coilpage.width", defaultMessage: "Width" },
  thickness: { id: "coilpage.thickness", defaultMessage: "Thickness" },
  material: { id: "coilpage.material", defaultMessage: "Material" },
  profile: { id: "coilpage.profile", defaultMessage: "Profile" },
  round: { id: "coilpage.round", defaultMessage: "Round" },
  ribbon: { id: "coilpage.ribbon", defaultMessage: "Ribbon" }
});

export const initialValues: CoilPageState = {
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

const createReduxForm = reduxForm({
  form: "coilPage",
  initialValues
});

export const CoilPage = createReduxForm(() => {
  const t = useFormatMessage();

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Field name="quantity" component={IntegerInput} label={t(messages.quantity)} />
      </Grid>
    </Box>
  );
});

/* <Grid item xs={12} md={6}>
          <IntegerInput
            min={1}
            label={t(messages.quantity)}
            value={props.quantity}
            onChange={(_, v) => props.setQuantity(v)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RadioSet
            disabled={!props.arrangement}
            label={t(messages.arrangement)}
            value={props.arrangement || false}
            onChange={(_, v) => props.setArrangement(v as any)}>
            <RadioElement value="parallel" label={t(messages.parallel)} />
            <RadioElement value="serial" label={t(messages.serial)} />
          </RadioSet>
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectInput
            label={t(messages.material)}
            value={props.material}
            onChange={(_, v) => props.setMaterial(v as number)}>
            {props.materials.map(({ name }, i) => (
              <MenuItem key={name} value={i}>
                {name}
              </MenuItem>
            ))}
          </SelectInput>
        </Grid> */

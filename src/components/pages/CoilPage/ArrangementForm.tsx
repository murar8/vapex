import { Collapse, Grid } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import { defineMessages } from "react-intl";
import { RadioInputButton } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { NumericField, RadioField } from "./Field";
import { Group, GroupItem } from "./GridItem";
import { initialState } from "./index";

export const messages = defineMessages({
  quantity: { id: "coilpage.quantity", defaultMessage: "Number of Coils" },
  arrangement: { id: "coilpage.arrangement", defaultMessage: "Arrangement" },
  parallel: { id: "coilpage.parallel", defaultMessage: "Parallel" },
  serial: { id: "coilpage.serial", defaultMessage: "Serial" }
});

export const ArrangementForm = () => {
  const { values } = useFormikContext<typeof initialState>();
  const t = useFormatMessage();
  return (
    <Group>
      <GroupItem>
        <NumericField name="quantity" label={t(messages.quantity)} />
      </GroupItem>
      <Collapse in={values.quantity > "1"} appear={false}>
        <GroupItem>
          <RadioField name="arrangement" label={t(messages.arrangement)}>
            <RadioInputButton value="parallel" label={t(messages.parallel)} />
            <RadioInputButton value="serial" label={t(messages.serial)} />
          </RadioField>
        </GroupItem>
      </Collapse>
    </Group>
  );
};

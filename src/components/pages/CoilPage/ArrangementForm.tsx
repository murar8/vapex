import { Typography } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import { defineMessages } from "react-intl";
import { RadioInputItem } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { CollapsibleGroupItem, Group, GroupItem } from "../../base/Group";
import { NumericField, RadioField } from "./Field";
import { initialState } from "./index";

export const messages = defineMessages({
  quantity: { id: "coilpage.quantity", defaultMessage: "Number of Coils" },
  title: { id: "coilpage.arrangement", defaultMessage: "Connection" },
  parallel: { id: "coilpage.parallel", defaultMessage: "Parallel" },
  serial: { id: "coilpage.serial", defaultMessage: "Serial" }
});

export const ArrangementForm = () => {
  const { values } = useFormikContext<typeof initialState>();
  const t = useFormatMessage();
  return (
    <Group>
      <GroupItem>
        <Typography variant="h6" gutterBottom>
          Arrangement
        </Typography>
      </GroupItem>
      <GroupItem>
        <NumericField name="quantity" label={t(messages.quantity)} />
      </GroupItem>
      <CollapsibleGroupItem in={values.quantity > "1"}>
        <RadioField name="arrangement" label={t(messages.title)}>
          <RadioInputItem value="parallel" label={t(messages.parallel)} />
          <RadioInputItem value="serial" label={t(messages.serial)} />
        </RadioField>
      </CollapsibleGroupItem>
    </Group>
  );
};

import { Collapse } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import { RadioInputButton } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { NumericField, RadioField } from "./Field";
import { Group, GroupItem, CollapsibleGroupItem } from "./GridItem";
import { initialState } from "./index";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  type: { id: "typeform.type", defaultMessage: "Coil type" },
  single: { id: "typeform.single", defaultMessage: "Single" },
  parallel: { id: "typeform.parallel", defaultMessage: "Parallel" },
  twisted: { id: "typeform.twisted", defaultMessage: "Twisted" },
  parallelQuantity: { id: "typeform.parallelQuantity", defaultMessage: "Number of Strands" },
  twistPitch: { id: "typeform.pitch", defaultMessage: "Twist Pitch" }
});

export const TypeForm = () => {
  const t = useFormatMessage();
  const { values } = useFormikContext<typeof initialState>();
  return (
    <Group>
      <GroupItem>
        <RadioField name="type" label={t(messages.type)}>
          <RadioInputButton value="single" label={t(messages.single)} />
          <RadioInputButton value="parallel" label={t(messages.parallel)} />
          <RadioInputButton value="twisted" label={t(messages.twisted)} />
        </RadioField>
      </GroupItem>
      <CollapsibleGroupItem in={values.type !== "single"}>
        <NumericField name="parallelQuantity" label={t(messages.parallelQuantity)} />
      </CollapsibleGroupItem>
      <CollapsibleGroupItem in={values.type === "twisted"}>
        <NumericField name="twistPitch" label={t(messages.twistPitch)} />
      </CollapsibleGroupItem>
    </Group>
  );
};

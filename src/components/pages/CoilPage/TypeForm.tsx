import { Collapse } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import { RadioInputItem } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { NumericField, RadioField } from "./Field";
import { Group, GroupItem, CollapsibleGroupItem } from "../../base/Group";
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
          <RadioInputItem value="single" label={t(messages.single)} />
          <RadioInputItem value="parallel" label={t(messages.parallel)} />
          <RadioInputItem value="twisted" label={t(messages.twisted)} />
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

import { Collapse } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";
import { RadioInputButton } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { NumericField, RadioField } from "./Field";
import { Group, GroupItem } from "./GridItem";
import { initialState } from "./index";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  diameter: { id: "coilpage.diameter", defaultMessage: "Diameter" },
  width: { id: "coilpage.width", defaultMessage: "Width" },
  thickness: { id: "coilpage.thickness", defaultMessage: "Thickness" },
  profile: { id: "coilpage.profile", defaultMessage: "Profile" },
  round: { id: "coilpage.round", defaultMessage: "Round" },
  ribbon: { id: "coilpage.ribbon", defaultMessage: "Ribbon" }
});

export const ProfileForm = () => {
  const { values } = useFormikContext<typeof initialState>();
  const t = useFormatMessage();
  return (
    <Group>
      <GroupItem>
        <RadioField name="profile" label={t(messages.profile)}>
          <RadioInputButton value="round" label={t(messages.round)} />
          <RadioInputButton value="ribbon" label={t(messages.ribbon)} />
        </RadioField>
      </GroupItem>
      <Collapse in={values.profile === "round"} appear={false}>
        <GroupItem>
          <NumericField name="diameter" label={t(messages.diameter)} />
        </GroupItem>
      </Collapse>
      <Collapse in={values.profile === "ribbon"} appear={false}>
        <GroupItem>
          <NumericField name="width" label={t(messages.width)} />
        </GroupItem>
        <GroupItem>
          <NumericField name="thickness" label={t(messages.thickness)} />
        </GroupItem>
      </Collapse>
    </Group>
  );
};

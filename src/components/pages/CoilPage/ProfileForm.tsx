import { useFormikContext } from "formik";
import React from "react";
import { defineMessages } from "react-intl";
import { RadioInputItem } from "src/components/base/RadioInput";
import { useFormatMessage } from "src/util/hooks";
import { NumericField, RadioField } from "./Field";
import { CollapsibleGroupItem, Group, GroupItem } from "../../base/Group";
import { initialState } from "./index";

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
          <RadioInputItem value="round" label={t(messages.round)} />
          <RadioInputItem value="ribbon" label={t(messages.ribbon)} />
        </RadioField>
      </GroupItem>
      <CollapsibleGroupItem in={values.profile === "round"}>
        <NumericField name="diameter" label={t(messages.diameter)} />
      </CollapsibleGroupItem>
      <CollapsibleGroupItem in={values.profile === "ribbon"}>
        <NumericField name="width" label={t(messages.width)} />
      </CollapsibleGroupItem>
      <CollapsibleGroupItem in={values.profile === "ribbon"}>
        <NumericField name="thickness" label={t(messages.thickness)} />
      </CollapsibleGroupItem>
    </Group>
  );
};

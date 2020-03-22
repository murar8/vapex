import React from "react";
import { useFormatMessage } from "src/util/hooks";
import { NumericField } from "./Field";
import { Group, GroupItem } from "../../base/Group";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  legLength: { id: "coilpage.legLength", defaultMessage: "Length of Legs" },
  innerDiameter: { id: "coilpage.innerDiameter", defaultMessage: "Internal Diameter" }
});

export const DimensionForm = () => {
  const t = useFormatMessage();
  return (
    <Group>
      <GroupItem>
        <NumericField name="legLength" label={t(messages.legLength)} />
      </GroupItem>
      <GroupItem>
        <NumericField name="innerDiameter" label={t(messages.innerDiameter)} />
      </GroupItem>
    </Group>
  );
};

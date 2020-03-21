import { MenuItem } from "@material-ui/core";
import React from "react";
import defaultMaterials from "src/data/materials.json";
import { useFormatMessage } from "src/util/hooks";
import { SelectField } from "./Field";
import { Group, GroupItem } from "./GridItem";
import { defineMessages } from "react-intl";

export const messages = defineMessages({
  material: { id: "coilpage.material", defaultMessage: "Material" }
});

export const MaterialForm = () => {
  const t = useFormatMessage();

  return (
    <Group>
      <GroupItem>
        <SelectField name="material" label={t(messages.material)}>
          {defaultMaterials.map(({ name }, i) => (
            <MenuItem key={name} value={i}>
              {name}
            </MenuItem>
          ))}
        </SelectField>
      </GroupItem>
    </Group>
  );
};

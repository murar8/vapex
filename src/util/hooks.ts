import { useState } from "react";
import { useIntl } from "react-intl";

export const useFormatMessage = () => useIntl().formatMessage;

export const useUniqueID = (prefix: string, length: number = 4) =>
  useState(() => {
    const id = Math.random()
      .toString()
      .substring(2, 2 + length);

    return prefix + "-" + id;
  })[0];

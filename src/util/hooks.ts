import { useState } from "react";
import { useIntl } from "react-intl";

export const useFormatMessage = () => useIntl().formatMessage;

export const useUniqueID = () => useState(() => Math.floor(Math.random() * 10e8))[0];

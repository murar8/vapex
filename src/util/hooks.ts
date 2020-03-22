import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

export const useFormatMessage = () => useIntl().formatMessage;

export const useUniqueID = () => useState(() => Math.floor(Math.random() * 10e8))[0];

export const useLocalStorage = <T extends string>(key: string, init: () => T) => {
  const [value, setValue] = useState<T>((localStorage.getItem(key) as T) ?? init);

  useEffect(() => localStorage.setItem(key, value), [key, value]);

  return [value, setValue] as const;
};

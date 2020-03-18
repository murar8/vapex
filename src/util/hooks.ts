import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

export const useFormatMessage = () => useIntl().formatMessage;

export const useTimeout = (duration: number) => {
  const [timeout, setID] = useState<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout), [timeout]);

  const run = () => {
    const id = window.setTimeout(() => setID(undefined), duration);
    setID(id);
  };

  const clear = () => {
    window.clearTimeout(timeout);
    setID(undefined);
  };

  return { run, clear, running: Boolean(timeout) };
};

export const useUniqueID = (prefix: string, length: number = 4) =>
  useState(() => {
    const id = Math.random()
      .toString()
      .substring(2, 2 + length);

    return prefix + "-" + id;
  })[0];

export const useBindMenu = () => {
  const [anchor, setAnchor] = useState<Element | null>(null);

  const bindControl = { onClick: (e: React.MouseEvent) => setAnchor(e.currentTarget) };

  const bindMenu = { anchorEl: anchor, open: Boolean(anchor), onClose: () => setAnchor(null) };

  const bindItem = (action: () => void) => ({
    onClick: (e: React.MouseEvent) => {
      setAnchor(null);
      action();
    }
  });

  return { bindControl, bindMenu, bindItem };
};

import {
  AppBar,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@material-ui/core";
import React from "react";
import { defineMessages } from "react-intl";
import { LinkTab, LinkTabs } from "src/components/common/Header/LinkTabs";
import { useFormatMessage } from "src/util/hooks";
import { LanguageButton } from "./LanguageButton";
import { PaletteButton } from "./PaletteButton";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: theme.palette.text.secondary,
    fontFamily: "Raleway, sans-serif"
  }
}));

const messages = defineMessages({
  liquid: { id: "header.liquid", defaultMessage: "E-liquid Mixer" },
  coil: { id: "header.coil", defaultMessage: "Coil Calculator" },
  drain: { id: "header.drain", defaultMessage: "Drain Calculator" }
});

export const Header: React.FC = () => {
  const t = useFormatMessage();
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <>
      <Slide in={!trigger} direction="down" appear={false}>
        <AppBar position="sticky" variant="outlined" color="primary">
          <Toolbar>
            <Typography variant={"h6"} className={classes.title}>
              vapex
            </Typography>
            <PaletteButton />
            <LanguageButton />
          </Toolbar>
          <LinkTabs>
            <LinkTab value="/coilwrapping" label={t(messages.coil)} />
            <LinkTab value="/liquidblending" label={t(messages.liquid)} />
            <LinkTab value="/batterydrain" label={t(messages.drain)} />
          </LinkTabs>
        </AppBar>
      </Slide>
    </>
  );
};

import { Avatar, Box, Button, Collapse, Grid, Paper, Typography } from "@material-ui/core";
import { NetworkCheck } from "@material-ui/icons";
import React from "react";
import { defineMessages } from "react-intl";
import { useDispatch } from "react-redux";
import { useSelector } from "src/redux";
import { localeActions } from "src/redux/actions";
import { useFormatMessage } from "src/util/hooks";
import { useDynamicIntl } from "./DynamicIntlProvider/IntlContext";

export type BannerProps = {
  icon: React.ReactNode;
};

const messages = defineMessages({
  content: {
    id: "errorbanner.content",
    defaultMessage: "There was a problem while retrieving your data.",
  },
  check: { id: "errorbanner.check", defaultMessage: "Please check your network connection." },
  retry: { id: "errorbanner.retry", defaultMessage: "Retry" },
  hide: { id: "errorbanner.hide", defaultMessage: "Hide" },
});

export const ErrorBanner = () => {
  const { t, clearError, status } = useDynamicIntl();

  return (
    <Collapse in={status === "error"}>
      <Box clone pt={2} pr={1} pb={1} pl={2}>
        <Paper elevation={0}>
          <Grid container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
              <Box bgcolor="primary.main" clone>
                <Avatar>
                  <NetworkCheck />
                </Avatar>
              </Box>
            </Grid>
            <Grid item>
              <Typography>{t(messages.content)}</Typography>
              <Typography variant="body2">{t(messages.check)}</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button color="primary" onClick={() => clearError()}>
                {t(messages.hide)}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Collapse>
  );
};

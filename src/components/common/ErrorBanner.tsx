import { Box, Paper, Grid, Avatar, Typography, Button, Collapse } from "@material-ui/core";
import React from "react";
import { NetworkCheck } from "@material-ui/icons";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "src/redux/store";
import { localeActions } from "src/redux/actions";
import { useFormatMessage } from "src/util/hooks";
import { defineMessages } from "react-intl";

export type BannerProps = {
  icon: React.ReactNode;
};

const messages = defineMessages({
  content: {
    id: "errorbanner.content",
    defaultMessage: "There was a problem while retrieving your data"
  },
  retry: { id: "errorbanner.retry", defaultMessage: "Retry" },
  hide: { id: "errorbanner.hide", defaultMessage: "Hide" }
});

export const ErrorBanner = ({
  hasError,
  error,
  retry,
  acknowledge
}: ConnectedProps<typeof connector>) => {
  const t = useFormatMessage();
  return (
    <Collapse in={hasError}>
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
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button color="primary" onClick={() => acknowledge()}>
                {t(messages.hide)}
              </Button>
              <Button color="primary" onClick={() => retry()}>
                {t(messages.retry)}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Collapse>
  );
};

const connector = connect(
  ({ locale: { error, status } }: RootState) => ({ error, hasError: status === "error" }),
  {
    retry: localeActions.fetchCurrentLocale,
    acknowledge: localeActions.clearError
  }
);

export default connector(ErrorBanner);

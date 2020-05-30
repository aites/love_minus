import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import classes from '../scss/object/footer.module.scss';
type FooterProps = {};

export default class Footer extends React.Component<FooterProps> {
  render() {
    return (
      <Grid container justify="center" className={classes.footer}>
        <Typography component="h6" variant="h6">
          © 2020 Triple-i inc.
        </Typography>
      </Grid>
    );
  }
}

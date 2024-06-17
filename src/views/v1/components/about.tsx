import { Box, Grid, Typography } from '../common/component';
import React from 'react';
import { profile } from '../../../data/profile';
import { makeStyles } from '../common/hook';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: 20,
  },
  lineBreak: {
    // lineBreak: 'normal',
    whiteSpace: 'pre-wrap',
  },
}));

export const About: React.FC = (props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>ABOUT</strong>
      </Typography>
      <Grid container spacing={1}>
        {[profile.about[0], profile.about[1]].map((text) => (
          <Grid item key={text}>
            <Typography>{text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

import { Box, Grid, Typography } from '../common/component';
import React from 'react';
import { profile } from '../../../data/profile';
import { makeStyles } from '../common/hook';

const useStyles = makeStyles(() => ({
  root: {
    // padding: 20,
  },
  lineBreak: {
    // lineBreak: 'normal',
    whiteSpace: 'pre-wrap',
  },
}));

export const About: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" gutterBottom>
        <strong>ABOUT</strong>
      </Typography>
      <Grid container spacing={1}>
        {profile.about.map((text) => (
          <Grid key={text}>
            <Typography>{text}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

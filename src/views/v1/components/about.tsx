import { Box, Typography } from '../common/component';
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
      <Typography className={classes.lineBreak}>{profile.about}</Typography>
    </Box>
  );
};

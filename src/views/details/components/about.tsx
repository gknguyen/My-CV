import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ProfileType } from '../../../data/profile';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
  },
  lineBreak: {
    // lineBreak: 'normal',
  },
}));

interface Props {
  profile: ProfileType;
}

const About: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>ABOUT</strong>
      </Typography>
      <Typography variant="h6" className={classes.lineBreak}>
        {props.profile.about}
      </Typography>
    </Box>
  );
};

export default About;

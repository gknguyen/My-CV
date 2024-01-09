import { makeStyles, Paper, PaperProps } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  rounded: {
    borderRadius: 8,
  },
}));

export const CustomPaper: React.FC<PaperProps> = (props) => {
  const classes = useStyles();

  return <Paper classes={{ rounded: classes.rounded }} {...props} elevation={2} />;
};

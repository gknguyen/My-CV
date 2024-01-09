import React from 'react';
import { makeStyles } from './hook';
import { PaperProps } from './interface';
import { Paper } from './component';

const useStyles = makeStyles(() => ({
  rounded: {
    borderRadius: 8,
  },
}));

export const CustomPaper: React.FC<PaperProps> = (props) => {
  const { classes } = useStyles();

  return <Paper classes={{ rounded: classes.rounded }} {...props} elevation={2} />;
};

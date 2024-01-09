import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { ScrollTopButton } from './common/scrollTopButton';
import { Profile } from './details/profile';
import { theme } from './style';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 800,
    // marginTop: '-35px',
    // marginBottom: '-55px',
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Profile />
        <ScrollTopButton />
      </Box>
    </ThemeProvider>
  );
};

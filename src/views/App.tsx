import { Box, makeStyles, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import configureStore from '../redux/configureStore';
import ScrollTopButton from './common/scrollTopButton';
import Profile from './details/profile';
import { theme } from './style';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 800,
    // marginTop: '-35px',
    // marginBottom: '-55px',
  },
}));

const store = configureStore();

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Box className={classes.root}>
          <Profile />
          <ScrollTopButton />
        </Box>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;

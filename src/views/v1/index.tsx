import { Box, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from './style';
import { Profile } from './components/profile';
import { ScrollTopButton } from './common/scrollTopButton';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 800,
    // marginTop: '-35px',
    // marginBottom: '-55px',
  },
}));

export const V1: React.FC = () => {
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

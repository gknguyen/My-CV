import { Box, ThemeProvider } from './common/component';
import { theme } from './style';
import { Profile } from './components/profile';
import { ScrollTopButton } from './common/scrollTopButton';
import { makeStyles } from './common/hook';
import './style.css';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 800,
    // marginTop: '-35px',
    // marginBottom: '-55px',
  },
}));

export const V1: React.FC = () => {
  const { classes } = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Profile />
        <ScrollTopButton />
      </Box>
    </ThemeProvider>
  );
};

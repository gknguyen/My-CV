import { FC } from 'react';
import { Box, ThemeProvider } from './common/component';
import { DownloadButton } from './common/downloadButton';
import { makeStyles } from './common/hook';
import { ScrollTopButton } from './common/scrollTopButton';
import { Profile } from './components/profile';
import { theme } from './style';
import './style.css';

const useStyles = makeStyles(() => ({
  root: {
    // minWidth: 800,
    // marginTop: '-35px',
    // marginBottom: '-55px',
    backgroundColor: '#a19f9f',
  },
}));

export const V1: FC = () => {
  const { classes } = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Box id="version-1" className={classes.root}>
        <Profile />

        <ScrollTopButton />
        <DownloadButton />
      </Box>
    </ThemeProvider>
  );
};

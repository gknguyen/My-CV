import { FC } from 'react';
import { IconButton } from './component';
import { makeStyles } from './hook';
import { GetAppIcon } from './icon';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2,
    position: 'fixed',
    top: '30px',
    right: '35px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &.Mui-focusVisible': {
      transition: '0.5s',
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.secondary.dark,
    },
    [theme.breakpoints.down('sm')]: {
      right: 'auto',
      left: '35px',
    },
  },
}));

export const DownloadButton: FC = () => {
  const { classes } = useStyles();

  return (
    <a href="/resumes/nguyen-truong-giang.pdf" target="_blank" rel="noopener noreferrer">
      <IconButton className={classes.root} aria-label="Download resume PDF">
        <GetAppIcon />
      </IconButton>
    </a>
  );
};

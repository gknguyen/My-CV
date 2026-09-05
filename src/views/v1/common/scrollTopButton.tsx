import { FC, useCallback, useEffect, useState } from 'react';
import { IconButton } from './component';
import { makeStyles } from './hook';
import { ExpandLessIcon } from './icon';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 2,
    position: 'fixed',
    bottom: '30px',
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

export const ScrollTopButton: FC = () => {
  const { classes } = useStyles();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {show && (
        <IconButton onClick={handleClick} className={classes.root}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </>
  );
};

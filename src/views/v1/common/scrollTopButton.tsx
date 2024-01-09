import React from 'react';
import { IconButton } from './component';
import { ExpandLessIcon } from './icon';
import { makeStyles } from './hook';

const useStyles = makeStyles((theme) => ({
  toTop: {
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
  },
}));

export const ScrollTopButton: React.FC = () => {
  const { classes } = useStyles();

  const [show, setShow] = React.useState(false);
  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    scrollPosition > 1000 ? setShow(true) : setShow(false);
  }, [scrollPosition]);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {show && (
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessIcon />
        </IconButton>
      )}
    </>
  );
};

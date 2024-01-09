import { useTheme } from '@mui/material/styles';
import { createMakeAndWithStyles } from 'tss-react';

const { makeStyles: makeStylesMui, withStyles } = createMakeAndWithStyles({ useTheme });
const makeStyles = makeStylesMui();
export { makeStyles, withStyles, makeStylesMui };

export { useMediaQuery } from '@mui/material';
export { createTheme, useTheme } from '@mui/material/styles';

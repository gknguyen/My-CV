import { createTheme, makeStyles } from './common/hook';

export const theme = createTheme({
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          paddingBottom: 20,
          color: 'white',
        },
        subheader: {
          paddingTop: 10,
          textAlign: 'end',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px',
          borderRight: '1px solid rgba(224, 224, 224, 1)',
          fontSize: 'inherit',
          verticalAlign: 'top',
        },
      },
    },
  },
});

export const useCommonStyles = makeStyles(() => ({
  tableHeader: {
    backgroundColor: '#29b6f6',
    color: '#eeeeee',
  },
  drag: {
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing',
    },
  },
}));

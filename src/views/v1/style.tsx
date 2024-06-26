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
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          lineHeight: 1.25,
        },
      },
    },
  },
});

export const useCommonStyles = makeStyles(() => ({
  tableHeader: {
    padding: 5,
  },
  tableHeaderCell: {
    backgroundColor: '#29b6f6',
    color: '#eeeeee',
    paddingTop: 5,
    paddingBottom: 5,
  },
  drag: {
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing',
    },
  },
  ul: {
    paddingLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemIcon: {
    minWidth: 30,
  },
  listItemAvatar: {
    minWidth: 40,
  },
}));

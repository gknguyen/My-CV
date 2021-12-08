import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
      title: {
        paddingBottom: 20,
        color: 'white',
      },
      subheader: {
        paddingTop: 10,
        textAlign: 'end',
      },
    },
    MuiCardContent: {
      root: {
        padding: 0,
      },
    },
    MuiTableCell: {
      root: {
        padding: '10px',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        fontSize: 'inherit',
        verticalAlign: 'top',
      },
    },
  },
});

export const useCommonStyles = makeStyles(() => ({
  tableHeader: {
    backgroundColor: '#29b6f6',
    color: '#eeeeee',
  },
}));

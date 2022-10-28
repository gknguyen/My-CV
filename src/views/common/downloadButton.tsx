import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const useStyles = makeStyles((theme) => ({
  toTop: {
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
  },
}));

const DownloadButton: React.FC = () => {
  const classes = useStyles();

  const handleClick = async () => {
    const component = document.getElementById('detail');

    if (component) {
      const doc = new jsPDF('p', 'mm', '', true);
      const canvas = await html2canvas(component, { removeContainer: true, scale: 2 });

      const contentDataURL = canvas.toDataURL('image/png');

      const margin = 0;
      const position = 0;
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight);
      doc.save(`NGUYEN_TRUONG_GIANG.pdf`);
    }
  };

  return (
    <IconButton onClick={handleClick} className={classes.toTop}>
      <GetAppIcon />
    </IconButton>
  );
};

export default DownloadButton;

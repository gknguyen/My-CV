import React from 'react';
import { CertificateImage } from '../../../../data/profile';
import { Dialog, DialogContent } from '../../common/component';
import { CustomPaper } from '../../common/customPaper';
import { makeStyles } from '../../common/hook';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: '5px',
  },
  image: {
    // width: 150,
    maxWidth: '100%',
  },
}));

interface Props {
  open: boolean;
  image: CertificateImage;
  closeHandlerCallBack: () => void;
}

export const CertificateImagePopup: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.closeHandlerCallBack}
      fullWidth
      maxWidth="md"
      PaperComponent={CustomPaper}
    >
      <DialogContent>
        <img className={classes.image} alt="certificate" src={props.image.image} />
      </DialogContent>
    </Dialog>
  );
};

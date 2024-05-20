import React from 'react';
import { CertificateImage } from '../../../../data/profile';
import { Dialog, DialogContent, DialogTitle } from '../../common/component';
import { DraggableDialog } from '../../common/draggableDialog';
import { makeStyles } from '../../common/hook';
import { useCommonStyles } from '../../style';

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
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.closeHandlerCallBack}
      fullWidth
      maxWidth="md"
      PaperComponent={DraggableDialog}
    >
      <DialogTitle id="draggable-dialog-title" className={commonClasses.drag}></DialogTitle>

      <DialogContent>
        <img className={classes.image} alt="certificate" src={props.image.link} />
      </DialogContent>
    </Dialog>
  );
};

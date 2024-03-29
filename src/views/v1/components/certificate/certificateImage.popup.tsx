import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from '../../common/component';
import React from 'react';
import { CertificateImage } from '../../../../data/profile';
import { CustomPaper } from '../../common/customPaper';
import { DraggableDialog } from '../../common/draggableDialog';
import { a11yProps, TabPanel } from '../../common/tabPanel';
import { useCommonStyles } from '../../style';
import { makeStyles, useTheme } from '../../common/hook';

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
  images: CertificateImage[];
  closeHandlerCallBack: () => void;
}

export const CertificateImagePopup: React.FC<Props> = (props) => {
  const { classes: commonClasses } = useCommonStyles();
  const { classes } = useStyles();
  const theme = useTheme();

  const [tabValue, setTabValue] = React.useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const handleClose = () => props.closeHandlerCallBack();

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperComponent={DraggableDialog}
    >
      <DialogTitle id="draggable-dialog-title" className={commonClasses.drag}></DialogTitle>

      <DialogContent>
        <CustomPaper className={classes.root} square>
          <Tabs textColor="secondary" variant="fullWidth" value={tabValue} onChange={handleChange}>
            {props.images.map((image, index) => (
              <Tab key={index} label={image.name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </CustomPaper>

        {props.images.map((image, index) => (
          <TabPanel
            key={index}
            value={tabValue}
            index={index}
            dir={theme.direction}
            style={{ overflowX: 'auto' }}
          >
            <img className={classes.image} alt="certificate" src={image.path} />
          </TabPanel>
        ))}
      </DialogContent>
    </Dialog>
  );
};

import { PaperProps } from '@material-ui/core';
import React from 'react';
import Draggable from 'react-draggable';
import CustomPaper from './customPaper';

const DraggableDialog: React.FC<PaperProps> = (props) => (
  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
    <CustomPaper {...props} />
  </Draggable>
);

export default DraggableDialog;

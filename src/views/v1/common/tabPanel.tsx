import { Box } from '@material-ui/core';
import React from 'react';

export const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

interface TabPanelProps {
  style?: React.CSSProperties;
  dir?: string;
  index: number;
  value: number;
  children?: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      style={{
        ...props.style,
        padding: 2,
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ paddingBottom: 36 }}>{children}</Box>}
    </Box>
  );
};

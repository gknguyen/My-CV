import { Box, List, Typography } from '../../common/component';
import React from 'react';
import { profile } from '../../../../data/profile';
import { ContactItem } from './contact.item';
import { makeStyles } from '../../common/hook';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles(() => ({
  root: {
    color: '#eeeeee',
    // padding: 20,
    // padding: '30px 20px',
  },
}));

export const Contact: React.FC = () => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>CONTACTS</strong>
      </Typography>

      <List className={commonClasses.list}>
        {profile.contacts.map((contact, index) => (
          <ContactItem key={index} contact={contact} />
        ))}
      </List>
    </Box>
  );
};

import { Box, List, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ProfileType } from '../../../../data/profile';
import ContactItem from './contact.item';

const useStyles = makeStyles(() => ({
  root: {
    color: '#eeeeee',
    padding: 30,
    // padding: '30px 20px',
  },
}));

interface Props {
  profile: ProfileType;
}

const Contact: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>CONTACTS</strong>
      </Typography>

      <List>
        {props.profile.contacts.map((contact, index) => (
          <ContactItem key={index} contact={contact} />
        ))}
      </List>
    </Box>
  );
};

export default Contact;

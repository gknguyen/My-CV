import { Avatar, Icon, Link, ListItem, ListItemAvatar, ListItemText } from '../../common/component';
import React from 'react';
import { ContactType } from '../../../../data/profile';
import { makeStyles } from '../../common/hook';

const useStyles = makeStyles(() => ({
  avatarColor: {
    backgroundColor: '#546e7a',
  },
}));

interface Props {
  contact: ContactType;
}

export const ContactItem: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatarColor}>
          <Icon>{props.contact.image}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          props.contact.type === 'url' ? (
            <Link href={`https://${props.contact.content}`} target="_blank" color="inherit">
              {props.contact.content}
            </Link>
          ) : (
            props.contact.content
          )
        }
      />
    </ListItem>
  );
};

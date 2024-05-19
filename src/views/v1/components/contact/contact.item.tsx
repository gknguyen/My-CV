import { Avatar, Icon, Link, ListItem, ListItemAvatar, ListItemText } from '../../common/component';
import React from 'react';
import { ContactType } from '../../../../data/profile';
import { makeStyles } from '../../common/hook';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles(() => ({
  avatarColor: {
    backgroundColor: '#546e7a',
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

interface Props {
  contact: ContactType;
}

export const ContactItem: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={commonClasses.listItemAvatar}>
        <Avatar className={classes.avatarColor} sx={{ width: 32, height: 32 }}>
          <Icon fontSize="small">{props.contact.image}</Icon>
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

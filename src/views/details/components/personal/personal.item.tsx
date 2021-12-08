import {
  Avatar,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { PersonalType } from '../../../../data/profile';

const useStyles = makeStyles(() => ({
  avatarColor: {
    backgroundColor: '#546e7a',
  },
}));

interface Props {
  personal: PersonalType;
}

const PersonalItem: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatarColor}>
          <Icon>{props.personal.image}</Icon>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.personal.content}
        secondary={props.personal.subContent}
        secondaryTypographyProps={props.personal.subContent ? { color: 'inherit' } : undefined}
      />
    </ListItem>
  );
};

export default PersonalItem;

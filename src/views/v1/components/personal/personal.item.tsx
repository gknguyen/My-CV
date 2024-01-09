import { Avatar, Icon, ListItem, ListItemAvatar, ListItemText } from '../../common/component';
import React from 'react';
import { PersonalType } from '../../../../data/profile';
import { makeStyles } from '../../common/hook';

const useStyles = makeStyles(() => ({
  avatarColor: {
    backgroundColor: '#546e7a',
  },
}));

interface Props {
  personal: PersonalType;
}

export const PersonalItem: React.FC<Props> = (props) => {
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

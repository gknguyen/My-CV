import { Avatar, Icon, ListItem, ListItemAvatar, ListItemText } from '../../common/component';
import React from 'react';
import { PersonalType } from '../../../../data/profile';
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
  personal: PersonalType;
}

export const PersonalItem: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <ListItem className={classes.listItem}>
      <ListItemAvatar className={commonClasses.listItemAvatar}>
        <Avatar className={classes.avatarColor} sx={{ width: 32, height: 32 }}>
          <Icon fontSize="small">{props.personal.image}</Icon>
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

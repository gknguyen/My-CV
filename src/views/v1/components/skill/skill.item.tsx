import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '../../common/component';
import React from 'react';
import { SkillType } from '../../../../data/profile';
import { makeStyles } from '../../common/hook';
import { AddIcon, ExpandLess, ExpandMore } from '../../common/icon';

const useStyles = makeStyles((theme) => ({
  list: {
    marginTop: 10,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    color: '#eeeeee',
  },
}));

interface Props {
  skill: SkillType;
}

export const SkillItem: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItem button onClick={handleClick} className={classes.list}>
        <ListItemIcon>
          {/* {props.skill.image} */}
          <Icon fontSize="large" className={classes.icon}>
            {props.skill.image}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={props.skill.category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.skill.list.map((item, index) => (
            <ListItem key={index} className={classes.nested}>
              <ListItemIcon>
                <AddIcon className={classes.icon} fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

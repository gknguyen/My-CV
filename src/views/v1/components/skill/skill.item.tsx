import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '../../common/component';
import React from 'react';
import { SkillType } from '../../../../data/profile';
import { makeStyles } from '../../common/hook';
import { AddIcon, ExpandLess, ExpandMore } from '../../common/icon';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 4,
    paddingBottom: 4,
  },
  nested: {
    paddingLeft: theme.spacing(2),
    paddingTop: 4,
    paddingBottom: 4,
  },
  icon: {
    color: '#eeeeee',
  },
}));

interface Props {
  skill: SkillType;
}

export const SkillItem: React.FC<Props> = (props) => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItem onClick={handleClick} className={classes.list}>
        <ListItemIcon className={commonClasses.listItemIcon}>
          <Icon fontSize="small" className={classes.icon}>
            {props.skill.image}
          </Icon>
        </ListItemIcon>
        <ListItemText primary={props.skill.category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.skill.list.map((item) => (
            <ListItem key={item} className={classes.nested}>
              <ListItemIcon className={commonClasses.listItemIcon}>
                <AddIcon className={classes.icon} fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ProfileType } from '../../../../data/profile';
import SkillItem from './skill.item';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 435,
    color: '#eeeeee',
    padding: 30,
    // padding: '30px 20px',
  },
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
  profile: ProfileType;
}

const Skill: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>SKILLS</strong>
      </Typography>

      {props.profile.skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} />
      ))}
    </Box>
  );
};

export default Skill;

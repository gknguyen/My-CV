import { Box, Typography } from '../../common/component';
import React from 'react';
import { profile } from '../../../../data/profile';
import { SkillItem } from './skill.item';
import { makeStyles } from '../../common/hook';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 480,
    color: '#eeeeee',
    // padding: 20,
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

export const Skill: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>SKILLS</strong>
      </Typography>

      {profile.skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} />
      ))}
    </Box>
  );
};

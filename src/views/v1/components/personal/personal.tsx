import { Box, List, Typography } from '../../common/component';
import React from 'react';
import { ProfileType } from '../../../../data/profile';
import { PersonalItem } from './personal.item';
import { makeStyles } from '../../common/hook';

const useStyles = makeStyles(() => ({
  root: {
    color: '#eeeeee',
    padding: 30,
  },
}));

interface Props {
  profile: ProfileType;
}

export const Personal: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>PERSONAL INFORMATIONS</strong>
      </Typography>

      <List>
        {props.profile.personals.map((personal, index) => (
          <PersonalItem key={index} personal={personal} />
        ))}
      </List>
    </Box>
  );
};

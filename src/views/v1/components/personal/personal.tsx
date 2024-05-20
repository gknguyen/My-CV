import { Box, List, Typography } from '../../common/component';
import React from 'react';
import { profile } from '../../../../data/profile';
import { PersonalItem } from './personal.item';
import { makeStyles } from '../../common/hook';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles(() => ({
  root: {
    color: '#eeeeee',
    // padding: '20px 20px 10px 20px',
  },
}));

export const Personal: React.FC = () => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography component="h2" display="block" gutterBottom>
        <strong>PERSONAL INFORMATIONS</strong>
      </Typography>

      <List className={commonClasses.list}>
        {profile.personals.map((personal, index) => (
          <PersonalItem key={index} personal={personal} />
        ))}
      </List>
    </Box>
  );
};

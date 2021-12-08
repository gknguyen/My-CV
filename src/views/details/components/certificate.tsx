import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ProfileType } from '../../../data/profile';

const useStyles = makeStyles(() => ({
  root: {
    padding: 30,
  },
}));

interface Props {
  profile: ProfileType;
}

const Certificate: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>CERTIFICATES</strong>
      </Typography>

      <ul>
        {props.profile.certificates.map((certificate, index) => (
          <li key={index}>
            <Link href={certificate.link} target="_blank">
              <Typography variant="h6">{certificate.name}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Certificate;

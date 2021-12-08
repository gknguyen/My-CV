import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useCommonStyles } from '../../../app/style';
import { ProfileType } from '../../../data/profile';

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: 200,
    padding: 30,
  },
}));

interface Props {
  profile: ProfileType;
}

const Project: React.FC<Props> = (props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>PERSONAL PROJECTS</strong>
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={commonClasses.tableHeader}>
                <Typography>
                  <strong>PRIOD</strong>
                </Typography>
              </TableCell>
              <TableCell className={commonClasses.tableHeader}>
                <Typography>
                  <strong>PROJECTS</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.profile.projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: 90 }}>
                  <Typography>{project.period}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" component="h2" display="block">
                    <strong>{project.title}</strong>
                  </Typography>
                  <Typography component="span">
                    {project.type}
                    <ul>
                      {project.descriptions.map((description, index) => (
                        <li key={index}>{description}</li>
                      ))}
                    </ul>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Project;

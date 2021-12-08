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
    padding: 30,
  },
}));

interface Props {
  profile: ProfileType;
}

const Experience: React.FC<Props> = (props) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" component="h2" display="block" gutterBottom>
        <strong>WORK EXPERIENCES</strong>
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
                  <strong>COMPANIES</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.profile.experiences.map((experience, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography style={{ width: 90 }}>{experience.period}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" component="h2" display="block">
                    <strong>{experience.title}</strong>
                  </Typography>

                  <Typography component="span">
                    {experience.position}
                    <ul>
                      {experience.descriptions.map((description, index) => (
                        <li key={index}>{description}</li>
                      ))}
                    </ul>
                  </Typography>

                  {experience.projects && (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell className={commonClasses.tableHeader}>
                              <Typography>NAME</Typography>
                            </TableCell>
                            <TableCell className={commonClasses.tableHeader}>
                              <Typography>DESCRIPTION</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {experience.projects.map((project, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Typography gutterBottom>
                                  <b>{project.name}</b>
                                </Typography>
                                <Typography>{project.position}</Typography>
                              </TableCell>
                              <TableCell>
                                <ul>
                                  {project.descriptions.map((description, index) => (
                                    <li key={index}>
                                      <Typography>{description}</Typography>
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Experience;

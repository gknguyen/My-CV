import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '../common/component';
import React from 'react';
import { useCommonStyles } from '../style';
import { ExperienceType } from '../../../data/profile';
import { makeStyles } from '../common/hook';

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: 740,
    // padding: 20,
  },
}));

interface IProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<IProps> = (props) => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>WORK EXPERIENCES</strong>
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={commonClasses.tableHeaderCell}>
                <Typography>
                  <strong>PRIOD</strong>
                </Typography>
              </TableCell>
              <TableCell className={commonClasses.tableHeaderCell}>
                <Typography>
                  <strong>COMPANIES</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.experiences.map((experience) => (
              <TableRow key={experience.title}>
                <TableCell>
                  <Typography style={{ width: 65 }}>{experience.period}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component="h2" display="block">
                    <strong>{experience.title}</strong>
                  </Typography>

                  <Typography component="span">
                    {experience.position}
                    <ul className={commonClasses.ul}>
                      {experience.descriptions.map((description) => (
                        <li key={description}>{description}</li>
                      ))}
                    </ul>
                  </Typography>

                  {experience.projects && (
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell className={commonClasses.tableHeaderCell}>
                              <Typography>NAME</Typography>
                            </TableCell>
                            <TableCell className={commonClasses.tableHeaderCell}>
                              <Typography>DESCRIPTION</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {experience.projects.map((project) => (
                            <TableRow key={project.name}>
                              <TableCell style={{ width: 40 }}>
                                <Typography gutterBottom>
                                  <b>{project.name}</b>
                                </Typography>
                                <Typography>{project.position}</Typography>
                              </TableCell>
                              <TableCell>
                                <ul className={commonClasses.ul}>
                                  {project.descriptions.map((description) => (
                                    <li key={description}>
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

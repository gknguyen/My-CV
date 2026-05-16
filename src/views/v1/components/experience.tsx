import React from 'react';
import { ExperienceType } from '../../../data/profile';
import { highlightAchievement } from '../../../shared/helper';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '../common/component';
import { makeStyles } from '../common/hook';
import { useCommonStyles } from '../style';

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

      <Grid container gap={2}>
        {props.experiences.map((experience) => (
          <Box key={experience.title}>
            <Typography variant="subtitle1" component="h2" display="block">
              <strong>
                {experience.title} ({experience.period})
              </strong>
            </Typography>

            <Typography component="span">
              {experience.position}
              <ul className={commonClasses.ul}>
                {experience.descriptions.map((description) => (
                  <li key={description}>{highlightAchievement(description)}</li>
                ))}
              </ul>
            </Typography>

            {!!experience.projects && (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={commonClasses.tableHeaderCell}>
                        <Typography>PROJECTS</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {experience.projects.map((project) => (
                      <TableRow key={project.name}>
                        <TableCell>
                          <Typography variant="subtitle2" gutterBottom>
                            <b>{project.name}</b>
                          </Typography>
                          <Typography gutterBottom>{project.position}</Typography>
                          <Typography component="span">
                            <ul
                              className={commonClasses.ul}
                              style={{ marginTop: 0, marginBottom: 0 }}
                            >
                              {project.descriptions.map((description) => (
                                <li key={description}>{highlightAchievement(description)}</li>
                              ))}
                            </ul>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

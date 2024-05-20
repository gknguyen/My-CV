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
import { ProjectType } from '../../../data/profile';
import { makeStyles } from '../common/hook';

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: 200,
    // padding: 20,
  },
}));

interface IProps {
  projects: ProjectType[];
}

export const Project: React.FC<IProps> = (props) => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>PERSONAL PROJECTS</strong>
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
                  <strong>PROJECTS</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.projects.map((project) => (
              <TableRow key={project.title}>
                <TableCell style={{ width: 65 }}>
                  <Typography>{project.period}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component="h2" display="block">
                    <strong>{project.title}</strong>
                  </Typography>
                  <Typography component="span">
                    {project.type}
                    <ul className={commonClasses.ul}>
                      {project.descriptions.map((description, index) => (
                        <li key={description}>{description}</li>
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

import React from 'react';
import { ProjectType } from '../../../data/profile';
import { isUrl } from '../../../shared/helper';
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '../common/component';
import { makeStyles } from '../common/hook';
import { useCommonStyles } from '../style';

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
          <TableBody>
            {props.projects.map((project) => (
              <TableRow key={project.title}>
                <TableCell>
                  <Typography component="h2" display="block">
                    <div>
                      <strong>{project.title}</strong>
                    </div>
                    <div>
                      <strong>{project.period}</strong>
                    </div>
                  </Typography>
                  <Typography component="span">
                    {project.type}
                    <ul className={commonClasses.ul}>
                      {project.descriptions.map((description, index) => (
                        <li key={`${index}-${description}`}>
                          {isUrl(description) ? (
                            <Link href={description} target="_blank">
                              {description}
                            </Link>
                          ) : (
                            <span>{description}</span>
                          )}
                        </li>
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

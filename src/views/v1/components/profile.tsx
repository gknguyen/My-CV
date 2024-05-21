import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Link,
} from '../common/component';
import React from 'react';
import { profile } from '../../../data/profile';
import { About } from './about';
import { Certificate } from './certificate/certificate';
import { Contact } from './contact/contact';
import { Experience } from './experience';
import { Personal } from './personal/personal';
import { Project } from './project';
import { Skill } from './skill/skill';
import { makeStyles } from '../common/hook';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: 160,
  },
  cardHeader: {
    // paddingLeft: 90,
    // paddingRight: 90,
    marginTop: -150,
    marginBottom: 0,
    borderBottom: '1px solid black',
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 20,
    border: '5px solid white',
  },
  personalInfo: {
    background: 'linear-gradient(45deg, #01579b 40%, #29b6f6 80%)',
    padding: 20,
    wordBreak: 'break-all',
    // height: '100%',
  },
  experienceInfo: {
    padding: 20,
  },
  cardFooter: {
    borderTop: '1px solid black',
    color: '#eeeeee',
    backgroundColor: '#01579b',
    height: 40,
    whiteSpace: 'pre-wrap',
  },
  printButton: {
    borderBottom: '1px solid black',
    padding: 10,
    color: '#eeeeee',
  },
  avatarColor: {
    backgroundColor: '#546e7a',
  },
}));

export const Profile: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Container disableGutters style={{ width: 800 }}>
      <Grid container gap={1}>
        <Card raised id="page-1" style={{ width: '100%' }}>
          <CardMedia className={classes.media} image="/images/background.jpg" />

          <CardHeader
            className={classes.cardHeader}
            avatar={<Avatar src={profile.avatar} className={classes.avatar} />}
            title={profile.name}
            titleTypographyProps={{ variant: 'h5', fontSize: '1.5rem' }}
            subheader={`${profile.career} (${profile.yearOfExp})`}
            subheaderTypographyProps={{ variant: 'h6', fontSize: '1.25rem' }}
          />

          <CardContent>
            <Grid container style={{ height: 830 }}>
              <Grid item xs={4} className={classes.personalInfo} direction="column">
                <div style={{ display: 'grid', gap: 20 }}>
                  <Personal />
                  <Contact />
                  <Certificate />
                </div>
              </Grid>

              <Grid item xs={8} className={classes.experienceInfo}>
                <div style={{ display: 'grid', gap: 20 }}>
                  <About />
                  <Project
                    projects={[profile.projects[0], profile.projects[1], profile.projects[2]]}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card raised id="page-2" style={{ width: '100%' }}>
          <CardContent>
            <Grid container style={{ height: 1120 }}>
              <Grid item xs={4} className={classes.personalInfo} direction="column">
                <Skill />
              </Grid>

              <Grid item xs={8} className={classes.experienceInfo}>
                <div style={{ display: 'grid', gap: 20 }}>
                  <Project projects={[profile.projects[4]]} />
                  <Experience experiences={[profile.experiences[0]]} />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card raised id="page-3" style={{ width: '100%' }}>
          <CardContent>
            <Grid container>
              <Grid
                container
                item
                xs={4}
                className={classes.personalInfo}
                direction="column"
                gap={2}
              ></Grid>

              <Grid container item xs={8} className={classes.experienceInfo} gap={2}>
                <Experience
                  experiences={[
                    profile.experiences[1],
                    profile.experiences[2],
                    profile.experiences[3],
                  ]}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardMedia>
            <Grid
              container
              item
              xs={12}
              className={classes.cardFooter}
              justifyContent="center"
              alignItems="center"
            >
              Powered by{' '}
              <Link href="https://material-ui.com" target="_blank" color="inherit">
                @Material-UI
              </Link>
            </Grid>
          </CardMedia>
        </Card>
      </Grid>
    </Container>
  );
};

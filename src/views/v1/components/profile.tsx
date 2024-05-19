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
  },
  experienceInfo: {
    padding: 20,
  },
  cardFooter: {
    borderTop: '1px solid black',
    color: '#eeeeee',
    backgroundColor: '#01579b',
    height: 40,
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
    <Container disableGutters style={{ maxWidth: 800 }}>
      <Card raised id="detail">
        <CardMedia className={classes.media} image="/images/background.jpg" />

        <CardHeader
          className={classes.cardHeader}
          avatar={<Avatar src={profile.avatar} className={classes.avatar} />}
          title={profile.name}
          titleTypographyProps={{ variant: 'h5', fontSize: '1.5rem' }}
          subheader={profile.career}
          subheaderTypographyProps={{ variant: 'h6', fontSize: '1.25rem' }}
        />

        <CardContent>
          <Grid container>
            <Grid
              container
              item
              xs={4}
              className={classes.personalInfo}
              direction="column"
              gap={2}
              style={{ wordBreak: 'break-all' }}
            >
              {/* <Container disableGutters style={{ wordBreak: 'break-all', gap: 4 }}> */}
              <Personal profile={profile} />
              <Contact profile={profile} />
              <Skill profile={profile} />
              {/* </Container> */}
            </Grid>

            <Grid container item xs={8} className={classes.experienceInfo} gap={2}>
              {/* <Container disableGutters> */}
              <About profile={profile} />
              <Certificate profile={profile} />
              <Experience profile={profile} />
              <Project profile={profile} />
              {/* </Container> */}
            </Grid>

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
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

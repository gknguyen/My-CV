import React from 'react';
import { CertificateImage, profile } from '../../../../data/profile';
import { Box, Link, Typography } from '../../common/component';
import { makeStyles } from '../../common/hook';
import { CertificateImagePopup } from './certificateImage.popup';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles(() => ({
  root: {
    // padding: 20,
    color: '#eeeeee',
  },
}));

const defaultImagePopupData = { open: false, image: {} as CertificateImage };

export const Certificate: React.FC = () => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  const [imagePopupData, setImagePopupData] = React.useState(defaultImagePopupData);

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>CERTIFICATES</strong>
      </Typography>

      <Typography component="span">
        <ul className={commonClasses.ul}>
          {profile.certificates.map((certificate) => (
            <li key={certificate.name}>
              <Typography>{certificate.name}</Typography>
              <Typography component="span">
                <ul className={commonClasses.ul}>
                  {certificate.list.map((ele) => (
                    <li key={ele.name}>
                      {ele.isPopup ? (
                        <Link
                          onClick={() => setImagePopupData({ open: true, image: ele })}
                          color="inherit"
                        >
                          <Typography>{ele.name}</Typography>
                        </Link>
                      ) : (
                        <Link href={ele.link} target="_blank" color="inherit">
                          <Typography>{ele.name}</Typography>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </Typography>
            </li>
          ))}
        </ul>
      </Typography>

      <CertificateImagePopup
        open={imagePopupData.open}
        image={imagePopupData.image}
        closeHandlerCallBack={() => setImagePopupData(defaultImagePopupData)}
      />
    </Box>
  );
};

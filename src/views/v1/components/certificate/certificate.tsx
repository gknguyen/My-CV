import React from 'react';
import { CertificateImage, profile } from '../../../../data/profile';
import { Box, Link, Typography } from '../../common/component';
import { makeStyles } from '../../common/hook';
import { CertificateImagePopup } from './certificateImage.popup';
import { useCommonStyles } from '../../style';

const useStyles = makeStyles(() => ({
  root: {
    // padding: 20,
  },
}));

const defaultImagePopupData = { open: false, images: [] as CertificateImage[] };

export const Certificate: React.FC = () => {
  const { classes } = useStyles();
  const { classes: commonClasses } = useCommonStyles();

  const [imagePopupData, setImagePopupData] = React.useState(defaultImagePopupData);

  return (
    <Box className={classes.root}>
      <Typography variant="h6" component="h2" display="block" gutterBottom>
        <strong>CERTIFICATES</strong>
      </Typography>

      <ul className={commonClasses.ul}>
        {profile.certificates.map((certificate) => (
          <li key={certificate.name}>
            {certificate.isPopup ? (
              <Link onClick={() => setImagePopupData({ open: true, images: certificate.images })}>
                <Typography>
                  {certificate.name}
                  {!!certificate.images && ` [${certificate.images.length}]`}
                </Typography>
              </Link>
            ) : certificate.list?.length ? (
              <>
                <Typography>{certificate.name}</Typography>
                <ul>
                  {certificate.list.map((ele) => (
                    <li key={ele.name}>
                      <Link href={ele.link} target="_blank">
                        <Typography>{ele.name}</Typography>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={certificate.link} target="_blank">
                <Typography>{certificate.name}</Typography>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <CertificateImagePopup
        open={imagePopupData.open}
        images={imagePopupData.images}
        closeHandlerCallBack={() => setImagePopupData(defaultImagePopupData)}
      />
    </Box>
  );
};

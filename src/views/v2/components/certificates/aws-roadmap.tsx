import { Typography } from '../../common/components';
import { ArrowRightIcon, PlusIcon } from '../../common/icon/solid';
import { cn } from '../../../../shared/helper';
import { APPLICATION_ARCHITECT } from '../../../../data/aws-roadmap';
import { CustomLink } from '../../common/customLink';

interface IProps {
  certs: {
    name: string;
    isShow: boolean;
    isPopup: boolean;
    link?: string;
    image: string;
  }[];
}

export const AwsRoadmap: React.FC<IProps> = (props) => {
  return (
    <div>
      <Typography
        placeholder=""
        variant="h5"
        color="blue-gray"
        className="mb-2 sm:text-center md:text-left"
      >
        {APPLICATION_ARCHITECT.title}
      </Typography>

      <div className="flex sm:flex-wrap md:flex-nowrap justify-center sm:gap-2 md:gap-0 my-6">
        {APPLICATION_ARCHITECT.certs.map((cert, index) => {
          const validCert = props.certs.find((ce) => ce.image === cert.image);
          return (
            <>
              {!!index && <ArrowRightIcon key={cert.title} className="sm:hidden md:block w-8" />}
              <img
                key={cert.title}
                alt={cert.title}
                src={cert.image}
                className={cn('h-40', validCert ? 'hover:cursor-pointer' : 'grayscale')}
                onClick={() => {
                  if (validCert?.link) window.open(validCert.link, '_blank');
                }}
              />
            </>
          );
        })}
      </div>

      <div className="border"></div>

      <div className="flex sm:flex-wrap md:flex-nowrap justify-center sm:gap-2 md:gap-0 my-6">
        {APPLICATION_ARCHITECT.addons.map((cert, index) => {
          const validCert = props.certs.find((ce) => ce.image === cert.image);
          return (
            <>
              {!!index && <PlusIcon key={cert.title} className="sm:hidden md:block w-[27px]" />}
              <img
                key={cert.title}
                alt={cert.title}
                src={cert.image}
                className={cn('h-40', validCert ? 'hover:cursor-pointer' : 'grayscale')}
                onClick={() => {
                  if (validCert?.link) window.open(validCert.link, '_blank');
                }}
              />
            </>
          );
        })}
      </div>

      <div className="sm:text-center md:text-left">
        For more detail: <CustomLink link="https://aws.amazon.com/certification" />
      </div>
    </div>
  );
};

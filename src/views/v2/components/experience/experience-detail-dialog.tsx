import { FC } from 'react';
import { highlightAchievement } from '../../../../shared/helper';
import { Card, CardBody, Dialog, Typography } from '../../common/components';

export interface ExperienceDetailType {
  name: string;
  position: string;
  descriptions: string[];
}

interface Props {
  open: boolean;
  detail: ExperienceDetailType | null;
  onClose: () => void;
}

export const ExperienceDetailDialog: FC<Props> = (props) => {
  return (
    <Dialog
      placeholder=""
      className="bg-transparent shadow-none"
      open={props.open}
      handler={props.onClose}
    >
      <Card placeholder="" className="mx-auto w-full">
        <CardBody placeholder="">
          <Typography placeholder="" variant="h4" color="blue-gray" className="pb-4">
            {props.detail?.name}
          </Typography>

          <Typography placeholder="" variant="h5" className="pb-2">
            {props.detail?.position}
          </Typography>

          {props.detail?.descriptions.map((description) => (
            <Typography key={description} placeholder="" variant="small" color="gray">
              {highlightAchievement(description)}
            </Typography>
          ))}
        </CardBody>
      </Card>
    </Dialog>
  );
};

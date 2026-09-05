import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { highlightAchievement } from '../../../../shared/helper';
import { Dialog, DialogBody, Typography } from '../../common/components';

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
      open={props.open}
      handler={props.onClose}
      size="md"
      className="rounded-xl"
    >
      <DialogBody placeholder="" className="p-0 overflow-hidden rounded-xl">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div>
            <Typography placeholder="" variant="h5" className="text-white font-bold leading-tight">
              {props.detail?.name}
            </Typography>
            <span className="mt-2 inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white tracking-wide">
              {props.detail?.position}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          <ul className="space-y-3">
            {props.detail?.descriptions.map((description) => (
              <li key={description} className="flex items-start gap-3">
                <CheckCircleIcon className="w-4 h-4 mt-0.5 shrink-0 text-blue-500" />
                <Typography placeholder="" variant="small" color="gray" className="leading-relaxed">
                  {highlightAchievement(description)}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </DialogBody>
    </Dialog>
  );
};

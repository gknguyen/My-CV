import { FC } from 'react';

interface IProps {
  link: string;
  notDisplayProtocol?: boolean;
}

export const CustomLink: FC<IProps> = (props) => {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="text-center text-blue-600 visited:text-purple-600 truncate italic underline"
    >
      {props.notDisplayProtocol ? props.link.replace(/^https?:\/\//, '') : props.link}
    </a>
  );
};

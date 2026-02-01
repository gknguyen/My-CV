import { FC } from 'react';

interface IProps {
  link: string;
}

export const CustomLink: FC<IProps> = (props) => {
  return (
    <a
      href={props.link}
      target="_blank"
      rel="noreferrer"
      className="text-center text-blue-600 visited:text-purple-600 truncate"
    >
      {props.link}
    </a>
  );
};

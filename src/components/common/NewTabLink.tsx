import React from 'react';
import { NoStyleLink } from './NoStyleLink';
import { Icon } from './icons/Icon';

type Props = {
  to: string;
  className?: string;
  children?: React.ReactNode;
};

export const NewTabLink: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <NoStyleLink
      target="_blank"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25em' }}
      {...rest}
    >
      {children} <Icon name="open-link" />
    </NoStyleLink>
  );
};

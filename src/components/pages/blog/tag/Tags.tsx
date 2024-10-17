import React from 'react';
import styled from 'styled-components';
import { BlogTag } from './BlogTag';
import { Tag } from './Tag';

type Props = {
  tags: Array<BlogTag>;
  className?: string;
};

export const Tags: React.FC<Props> = ({ className, tags }) => {
  return (
    <Wrapper className={className}>
      {tags.map(t => (
        <Tag tag={t} key={t} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25em;
  flex-wrap: wrap;
`;

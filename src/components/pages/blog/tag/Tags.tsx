import styled from 'styled-components';
import { BlogTag } from './BlogTag';
import { Tag } from './Tag';

type Props = {
  tags: Array<BlogTag>;
  className?: string;
};

export const Tags = styled(({ className, tags }: Props) => {
  return (
    <div className={className}>
      {tags.map(t => (
        <Tag tag={t} key={t} />
      ))}
    </div>
  );
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25em;
  flex-wrap: wrap;
`;

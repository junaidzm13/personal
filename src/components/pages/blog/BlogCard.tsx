import React from 'react';
import { fromPublic } from '../../../utils/fromPublic';
import styled from 'styled-components';
import { Tags } from './tag/Tags';
import { FONT_SIZE_OVERRIDE } from '../../../constants/css';
import { colors } from '../../../theme/colors';
import { BlogTag } from './tag/BlogTag';

export interface Blog {
  id: string;
  title: string;
  tags: Array<BlogTag>;
  datePublished: string;
  readingTimeMins: number;
  cover: string;
  component: () => React.ReactNode;
}

interface Props extends Blog {
  className?: string;
}

export const BlogCard: React.FC<Props> = ({ className, ...blog }) => {
  return (
    <BlogItemWrapper className={className}>
      <BlogItemImage>
        <img src={fromPublic(`blog-covers/${blog.cover}`)} alt="Blog cover" />
      </BlogItemImage>
      <BlogItemBody>
        <BlogItemHeader>
          <BlogItemTitle>{blog.title}</BlogItemTitle>
          <DateAndReadingTimeWrapper>
            <span>{blog.datePublished}</span>
            <span>{blog.readingTimeMins} min read</span>
          </DateAndReadingTimeWrapper>
        </BlogItemHeader>
        <Tags tags={blog.tags.slice(0, 3).sort()} />
      </BlogItemBody>
    </BlogItemWrapper>
  );
};

const BlogItemWrapper = styled.div`
  ${FONT_SIZE_OVERRIDE}
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 17.5em;
  width: 100%;
  border: solid 1px ${colors.SURFACE_6DP};
  border-radius: 0.5em;
  overflow: hidden;
  background-color: ${colors.PRIMARY};
  box-shadow: 0 0 2px 2px rgb(255, 255, 255, 0.1); // @todo
`;

const BlogItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10em;

  img {
    max-height: 10em;
  }
`;

const BlogItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 0.5em;
  background-color: ${colors.SURFACE_6DP};
`;

const BlogItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  align-items: start;
`;

const BlogItemTitle = styled.span`
  color: ${colors.ON_SURFACE};
`;

const DateAndReadingTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875em;
  color: ${colors.GRAY_4};
  width: 100%;
`;

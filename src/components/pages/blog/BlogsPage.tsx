import React from 'react';
import styled from 'styled-components';
import { BlogTag } from './tag/BlogTag';
import { Tags } from './tag/Tags';
import { fromPublic } from '../../../utils/fromPublic';
import { colors } from '../../../theme/colors';
import { CleanReactPost } from './posts/CleanReactPost';
import { Link } from 'react-router-dom';
import { WIDTH_BOUNDARY_SMALLEST } from '../../../constants/layout';

export const BlogsPage: React.FC = () => {
  return (
    <Wrapper>
      <PageHeader>
        <PageHeading>{'Blogs'}</PageHeading>
        <span>
          Consider this a journal where I document my unique experiences,
          learnings as well as industry best-practices.
        </span>
      </PageHeader>
      <CardsWrapper>
        {blogs.map(b => (
          <NoStyleLink to={b.id}>
            <BlogCard {...b} key={b.id} />
          </NoStyleLink>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 1em;
`;

const PageHeading = styled.span`
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60em;
  width: 95%;
  gap: 1em;
  padding-bottom: 1.5em;
  margin-bottom: 1.5em;

  border-bottom: 1px solid ${colors.GRAY};

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    align-items: center;
    justify-content: start;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  max-width: 60em;
  gap: 3em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }
`;

const NoStyleLink = styled(Link)`
  text-decoration: none;
  height: fit-content;
`;

const BlogCard: React.FC<Blog> = props => {
  return (
    <BlogItemWrapper>
      <BlogItemImage>
        <img src={fromPublic(`blog-covers/${props.cover}`)} alt="cover" />
      </BlogItemImage>
      <BlogItemBody>
        <BlogItemHeader>
          <span>{props.title}</span>
          <DateAndReadingTimeWrapper>
            <span>{props.datePublished}</span>
            <span>{props.readingTimeMins} min read</span>
          </DateAndReadingTimeWrapper>
        </BlogItemHeader>
        <Tags tags={props.tags} />
      </BlogItemBody>
    </BlogItemWrapper>
  );
};

const BlogItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 17.5em;
  border: solid 1px black;
  border-radius: 0.5em;
  overflow: hidden;

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
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
  border-top: solid 1px ${colors.LEAD};
  background-color: ${colors.GRAY};
`;

const BlogItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  align-items: start;
`;

const DateAndReadingTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875em;
  color: gray;
  width: 100%;
`;

export type Blog = {
  id: string;
  title: string;
  mdFileName: string;
  tags: Array<BlogTag>;
  datePublished: string;
  readingTimeMins: number;
  cover: string;
  component: () => React.ReactElement<any, any>;
};

export const blogs: Array<Blog> = [
  {
    id: '0001',
    title: 'Writing clean React using HOFs as callbacks',
    mdFileName: 'clean-react.md',
    tags: [BlogTag.CleanCode, BlogTag.React, BlogTag.TypeScript],
    datePublished: '15 Oct 2024',
    readingTimeMins: 2,
    cover: 'clean-react.png',
    component: () => <CleanReactPost />,
  },
];

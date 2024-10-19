import React from 'react';
import styled from 'styled-components';
import { BlogTag } from './tag/BlogTag';
import { Tags } from './tag/Tags';
import { fromPublic } from '../../../utils/fromPublic';
import { colors } from '../../../theme/colors';
import { CleanReactPost } from './posts/CleanReactPost';
import { Link } from 'react-router-dom';
import { OVERRIDE_EM_FONT } from '../../../constants/css';

export const BlogsPage: React.FC = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <PageHeader>
          <PageHeading>{'Blogs'}</PageHeading>
          <PageDescription>
            Consider this a journal where I document my selected experiences,
            learnings and industry best-practices.
          </PageDescription>
        </PageHeader>
        <CardsWrapper>
          {blogs.map(b => (
            <NoStyleLink to={b.id}>
              <BlogCard {...b} key={b.id} />
            </NoStyleLink>
          ))}
        </CardsWrapper>
      </InnerWrapper>
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

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 57em;
`;

const PageHeading = styled.span`
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const PageDescription = styled.span`
  ${OVERRIDE_EM_FONT}
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-bottom: 1.5em;
  margin-bottom: 1.5em;

  border-bottom: 1px solid ${colors.GRAY};
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 2em;

  @media (max-width: 45em) {
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 1em;
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
          <BlogItemTitle>{props.title}</BlogItemTitle>
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
  ${OVERRIDE_EM_FONT}
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 17.5em;
  width: 100%;
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

const BlogItemTitle = styled.span`
  color: ${colors.LEAD};
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

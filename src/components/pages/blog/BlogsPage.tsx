import React from 'react';
import styled from 'styled-components';
import { BlogTag } from './tag/BlogTag';
import { colors } from '../../../theme/colors';
import { CleanReactPost } from './posts/CleanReactPost';
import { FONT_SIZE_OVERRIDE } from '../../../constants/css';
import { DataSourceReplacementPost } from './posts/DataSourceReplacementPost';
import { ParameterizedSqlBuilder } from './posts/ParameterizedSqlBuilder';
import { Blog, BlogCard } from './BlogCard';
import { NoStyleLink } from '../../common/NoStyleLink';

export const BlogsPage: React.FC = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <PageHeader>
          <PageHeading>{'Blogs'}</PageHeading>
          <PageDescription>
            A journal where I document my selected experiences, learnings and
            industry best-practices.
          </PageDescription>
        </PageHeader>
        <CardsWrapper>
          {blogs.map(b => (
            <NoStyleLink key={b.id} to={b.id}>
              <BlogCard {...b} />
            </NoStyleLink>
          ))}
        </CardsWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.BACKGROUND};
  color: ${colors.ON_SURFACE};
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

const PageHeading = styled.h1`
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin: 0;
`;

const PageDescription = styled.span`
  ${FONT_SIZE_OVERRIDE}
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-bottom: 1.5em;
  margin-bottom: 1.5em;

  border-bottom: 1px solid ${colors.SURFACE};
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

export const blogs: Array<Blog> = [
  {
    id: '1',
    title: 'Writing clean React using HOFs as callbacks',
    tags: [BlogTag.CleanCode, BlogTag.React, BlogTag.TypeScript],
    datePublished: '15 Oct 2024',
    readingTimeMins: 2,
    cover: 'clean-react.png',
    component: () => <CleanReactPost />,
  },
  {
    id: '2',
    title: 'Replacing a critical datasource with minimal change in downstream',
    tags: [
      BlogTag.Architecture,
      BlogTag.DesignPatterns,
      BlogTag.Spring,
      BlogTag.Kotlin,
      BlogTag.CleanCode,
    ],
    datePublished: '22 Oct 2024',
    readingTimeMins: 3,
    cover: 'datasource-replacement.png',
    component: () => <DataSourceReplacementPost />,
  },
  {
    id: '3',
    title: 'Parameterizing SQL query to prevent injection attacks',
    tags: [
      BlogTag.CleanCode,
      BlogTag.Databases,
      BlogTag.SQL,
      BlogTag.Scala,
      BlogTag.Ignite,
    ],
    datePublished: '24 Dec 2024',
    readingTimeMins: 3,
    cover: 'parameterized-sql.png',
    component: () => <ParameterizedSqlBuilder />,
  },
];

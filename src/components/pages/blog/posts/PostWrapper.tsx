import React from 'react';
import styled from 'styled-components';
import { fromPublic } from '../../../../utils/fromPublic';
import { colors } from '../../../../theme/colors';
import { Tags } from '../tag/Tags';
import {
  WIDTH_BOUNDARY_SMALL,
  WIDTH_BOUNDARY_SMALLEST,
} from '../../../../constants/layout';
import { FONT_SIZE_OVERRIDE } from '../../../../constants/css';
import { Blog } from '../BlogCard';

type Props = Omit<Blog, 'component'> & { children: React.ReactNode };

export const PostWrapper: React.FC<Props> = props => {
  const { cover, datePublished, readingTimeMins, tags, title, children } =
    props;

  return (
    <Wrapper>
      <HeadingWrapper>
        <HeadingContentWrapper>
          <Title>{title}</Title>
          <DateAndReadingTimeWrapper>
            <span>{`${readingTimeMins} minutes read`}</span>
            <span>{datePublished}</span>
          </DateAndReadingTimeWrapper>
        </HeadingContentWrapper>
        <CoverImg src={fromPublic(`blog-covers/${cover}`)} alt={'Blog cover'} />
      </HeadingWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <StyledTags tags={tags.slice().sort()} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50em;
  width: 95%;
  background-color: ${colors.BACKGROUND};
  color: ${colors.ON_SURFACE};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FONT_SIZE_OVERRIDE}
  border-bottom: solid 1px ${colors.SURFACE};
  padding: 0.5em 0;
  margin-bottom: 0.25em;

  p {
    line-height: 1.6;
    margin: 0.5em 0;
  }

  ol {
    margin: 0;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${colors.SURFACE};

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    flex-direction: column-reverse;
    justify-content: start;
  }
`;

const HeadingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateAndReadingTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.GRAY_4};
`;

const Title = styled.h1`
  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
    font-size: 1.75em;
  }

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    font-size: 1.5em;
  }
`;

const CoverImg = styled.img`
  width: 15em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
    width: 12em;
  }
`;

const StyledTags = styled(Tags)`
  ${FONT_SIZE_OVERRIDE}
  padding: 0.5em 0.125em;
`;

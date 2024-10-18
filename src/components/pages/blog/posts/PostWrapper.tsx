import styled from 'styled-components';
import { Blog } from '../BlogsPage';
import { fromPublic } from '../../../../utils/fromPublic';
import { colors } from '../../../../theme/colors';
import { Tags } from '../tag/Tags';
import {
  WIDTH_BOUNDARY_SMALLEST,
  WIDTH_BOUNDARY_SMALL,
} from '../../../../constants/layout';
import { OVERRIDE_EM_FONT } from '../../../../constants/css';

type Props = Exclude<Blog, 'component'> & { children: React.ReactNode };

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
      <StyledTags tags={tags} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
    width: 95%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${OVERRIDE_EM_FONT}

  border-bottom: solid 1px ${colors.GRAY};

  > p {
    line-height: 1.6;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${colors.GRAY};

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
  color: gray;
`;

const Title = styled.h1`
  @media (max-width: 500px) {
    font-size: 1.5em;
  }
`;

const CoverImg = styled.img`
  width: 15em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    width: 12em;
  }
`;

const StyledTags = styled(Tags)`
  ${OVERRIDE_EM_FONT}
  padding: 0.5em 0.125em;
`;

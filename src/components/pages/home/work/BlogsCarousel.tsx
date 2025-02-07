import React, { useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { blogs } from '../../blog/BlogsPage';
import { Blog, BlogCard } from '../../blog/BlogCard';
import { colors } from '../../../../theme/colors';
import { Icon } from '../../../common/icons/Icon';
import { WIDTH_BOUNDARY_SMALLEST } from '../../../../constants/layout';
import { NoStyleLink } from '../../../common/NoStyleLink';
import { NewTabLink } from '../../../common/NewTabLink';

export const BlogsCarousel: React.FC = () => {
  const [numCardsShown, setNumCardsShown] = React.useState(3);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScreenSizeChange = useCallback(() => {
    const { clientWidth } = document.body;
    const newNumCardsShown = determineNumCardsShown(clientWidth);
    setNumCardsShown(numCardsShown => {
      const numCardsShownDiff = newNumCardsShown - numCardsShown;
      if (numCardsShownDiff > 0)
        setActiveIndex(i => Math.max(i - numCardsShownDiff, 0));
      return newNumCardsShown;
    });
  }, []);

  useLayoutEffect(() => {
    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
    return () => window.removeEventListener('resize', () => {});
  }, [handleScreenSizeChange]);

  const getClickHandler = (direction: Direction) => () => {
    setActiveIndex(i => nextActiveIndexGetterByDirection[direction](i));
  };

  const isDisabled = (direction: Direction) =>
    disabledByDirection[direction](activeIndex, numCardsShown);

  const shownBlogs = blogs.slice(activeIndex, activeIndex + numCardsShown);

  return (
    <Wrapper>
      <Heading>
        {'Selected learnings, work samples and best practices '}
        <BlogsLink to={'/blogs'} />
      </Heading>
      <CarouselWrapper>
        <ChevronButton
          disabled={isDisabled('left')}
          onClick={getClickHandler('left')}
          direction="left"
        />
        <BlogCards>
          {shownBlogs.map(b => (
            <ClickableBlogCard key={b.id} {...b} />
          ))}
        </BlogCards>
        <ChevronButton
          disabled={isDisabled('right')}
          onClick={getClickHandler('right')}
          direction="right"
        />
      </CarouselWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;
  align-items: center;
  background-color: white;
  padding: 1em 0.25em 3em;
  border-bottom: 0.0675em solid ${colors.LEAD};
`;

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BlogCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;

const ClickableBlogCard = styled((blog: Blog) => {
  return (
    <NoStyleLink to={`/blogs/${blog.id}`}>
      <BlogCard {...blog} />
    </NoStyleLink>
  );
})``;

const Heading = styled.span`
  display: inline-block;
  color: ${colors.LEAD};
  font-size: 1.125em;
  text-align: center;
  padding: 0 0.25em;
`;

const BlogsLink = styled(NewTabLink)`
  &:before {
    content: '(view all';
  }

  &:after {
    content: ')';
  }
`;

type Direction = 'left' | 'right';

const nextActiveIndexGetterByDirection: Record<
  Direction,
  (i: number) => number
> = {
  left: i => i - 1,
  right: i => i + 1,
} as const;

const disabledByDirection: Record<
  Direction,
  (i: number, numDisplayed: number) => boolean
> = {
  left: i => i === 0,
  right: (i, numDisplayed) => i === blogs.length - numDisplayed,
} as const;

function determineNumCardsShown(width: number) {
  if (width >= 1130) return 3;
  if (width >= 830) return 2;
  return 1;
}

type ChevronButtonProps = {
  onClick: () => void;
  disabled: boolean;
  direction: Direction;
  className?: string;
};

const ChevronButton = styled(
  ({ onClick, disabled, direction, className }: ChevronButtonProps) => {
    return (
      <button className={className} disabled={disabled} onClick={onClick}>
        <Icon
          name={`${direction}-arrow`}
          style={{ width: '2.5em', height: '2.5em' }}
        />
      </button>
    );
  }
)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3em;

  @media (max-width: ${WIDTH_BOUNDARY_SMALLEST}) {
    padding: 1em;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

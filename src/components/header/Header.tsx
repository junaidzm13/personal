import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { fromPublic } from '../../utils/fromPublic';
import { Menu } from './Menu';
import { useScrollBar } from './useScrollBar';

export const Header: React.FC = () => {
  const viewRef = React.createRef<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  const { scrollPercentage } = useScrollBar();

  useLayoutEffect(() => {
    if (!viewRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height)
    );
    resizeObserver.observe(viewRef.current);
    return () => resizeObserver.disconnect();
  }, [viewRef]);

  return (
    <Wrapper>
      <StyledHeader ref={viewRef}>
        <BitmojiImageWrapper id="my-anchor">
          <img src={fromPublic('bitmoji.jpeg')} alt="Junaid Malik's Bitmoji" />
        </BitmojiImageWrapper>
        <Menu anchorId="my-anchor" yOffset={height} />
      </StyledHeader>
      <ScrollProgressBar widthPercent={scrollPercentage} />
    </Wrapper>
  );
};

const BitmojiImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.75em;
  width: 2.75em;
  border-radius: 5em;
  overflow: hidden;
  margin: 0.25em;
  margin-left: 0.5em;

  > img {
    height: 2.75em;
  }
`;

const StyledHeader = styled.div.attrs(({ ref }) => ({ ref }))`
  display: flex;
  flex-direction: row;
  background-color: ${colors.SURFACE};
  width: 100%;
  overflow: hidden;
`;

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const ScrollProgressBar = styled.div<{ widthPercent: number }>`
  height: 0.1em;
  width: ${({ widthPercent }) => widthPercent}%;
  background-color: ${colors.PRIMARY};
`;

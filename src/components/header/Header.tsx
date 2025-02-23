import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { fromPublic } from '../../utils/fromPublic';
import { Menu } from './Menu';

export const Header: React.FC = () => {
  const viewRef = React.createRef<HTMLElement>();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!viewRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height)
    );
    resizeObserver.observe(viewRef.current);
    return () => resizeObserver.disconnect();
  }, [viewRef]);

  return (
    <StyledHeader ref={viewRef}>
      <BitmojiImageWrapper id="my-anchor">
        <img src={fromPublic('bitmoji.jpeg')} alt="Junaid Malik's Bitmoji" />
      </BitmojiImageWrapper>
      <Menu anchorId="my-anchor" yOffset={height} />
    </StyledHeader>
  );
};

const BitmojiImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 3em;
  border-radius: 5em;
  overflow: hidden;
  margin: 0.25em;
  margin-left: 0.5em;

  > img {
    height: 3em;
  }
`;

const StyledHeader = styled.header.attrs(({ ref }) => ({ ref }))`
  display: flex;
  flex-direction: row;
  background-color: ${colors.SURFACE};
  width: 100%;
  overflow: hidden;
`;

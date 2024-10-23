import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { fromPublic } from '../../utils/fromPublic';
import { colors } from '../../theme/colors';

type Props = {
  anchorId: string;
  yOffset?: number;
};

export const Menu: React.FC<Props> = props => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Tooltip
      anchorSelect={`#${props.anchorId}`}
      clickable
      noArrow
      place="bottom-start"
      positionStrategy="absolute"
      position={{ x: -5, y: (props.yOffset ?? 55) + 5 }}
      offset={0}
      disableStyleInjection
      opacity={1}
      isOpen={isMenuOpen}
      setIsOpen={setIsMenuOpen}
    >
      <Wrapper>
        {items.map(item => (
          <MenuItem
            key={item.text}
            onClick={() => setIsMenuOpen(false)}
            {...item}
          />
        ))}
      </Wrapper>
    </Tooltip>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  box-shadow: 0.1px 0.1px 3px black;
  min-width: 10em;

  background-color: ${colors.GRAY};

  & > * {
    border-top: solid 1px ${colors.GRAY_1};
  }
`;

type MenuItemProps = {
  text: string;
  to: string;
  src: string;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = props => {
  const { text, to, src, onClick } = props;
  const { pathname } = useLocation();

  return (
    <StyledLink to={to} onClick={onClick} selected={pathname === to}>
      <img src={fromPublic(src)} alt={`Go to ${text.toLowerCase} page.`} />
      <span>{text}</span>
    </StyledLink>
  );
};

const StyledLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  text-decoration: none;
  color: black;
  padding: 0.6125em 0;
  padding-left: 1.25em;
  gap: 0.5em;
  ${({ selected }) => selected && `background-color: ${colors.GRAY_1}`};

  &:hover {
    opacity: 0.75;
    background-color: ${colors.GRAY_1};
    cursor: pointer;
  }

  & > span {
    letter-spacing: 0.4px;
  }

  & > img {
    width: 1.0675em;
  }
`;

const items: Array<Omit<MenuItemProps, 'onClick'>> = [
  {
    src: 'home-icon.svg',
    to: '/',
    text: 'Home',
  },
  {
    src: 'typewriter-icon.svg',
    to: '/blogs',
    text: 'Blogs',
  },
];

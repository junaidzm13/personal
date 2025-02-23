import React, { useMemo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { Icon, IconProps } from '../common/icons/Icon';

type Props = {
  anchorId: string;
  yOffset?: number;
};

const DEFAULT_Y_OFFSET = 60 as const;
const Y_OFFSET_ADJUSTMENT = 5 as const;

export const Menu: React.FC<Props> = ({ anchorId, yOffset }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const yPosition = useMemo(
    () => (yOffset ? yOffset + Y_OFFSET_ADJUSTMENT : DEFAULT_Y_OFFSET),
    [yOffset]
  );

  return (
    <Tooltip
      anchorSelect={`#${anchorId}`}
      clickable
      noArrow
      place="bottom-start"
      positionStrategy="absolute"
      position={{ x: -5, y: yPosition }}
      offset={0}
      disableStyleInjection
      opacity={1}
      isOpen={isMenuOpen}
      setIsOpen={setIsMenuOpen}
      style={{ zIndex: 1 }}
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
  box-shadow: 0.1px 0.1px 3px ${colors.SURFACE};
  min-width: 10em;

  background-color: ${colors.SURFACE};

  & > * {
    border-top: solid 1px ${colors.SURFACE_6DP};
  }
`;

type MenuItemProps = {
  text: string;
  to: string;
  icon: IconProps['name'];
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = props => {
  const { text, to, icon, onClick } = props;
  const { pathname } = useLocation();

  return (
    <StyledLink to={to} onClick={onClick} selected={pathname === to}>
      <StyledIcon name={icon} />
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
  color: ${colors.ON_SURFACE};
  padding: 0.6125em 0;
  padding-left: 1.25em;
  gap: 0.5em;
  ${({ selected }) => selected && `background-color: ${colors.SURFACE_6DP}`};

  &:hover {
    opacity: 0.75;
    background-color: ${colors.SURFACE_6DP};
    cursor: pointer;
  }

  & > span {
    letter-spacing: 0.4px;
  }
`;

const StyledIcon = styled(Icon).attrs({
  color: colors.PRIMARY,
})`
  width: 1.0675em;
  height: auto;
`;

const items: Array<Omit<MenuItemProps, 'onClick'>> = [
  {
    icon: 'home',
    to: '/',
    text: 'Home',
  },
  {
    icon: 'typewriter',
    to: '/blogs',
    text: 'Blogs',
  },
];

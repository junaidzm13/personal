import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NoStyleLink = styled(Link)`
  text-decoration: none;
  height: fit-content;
  color: inherit;

  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;

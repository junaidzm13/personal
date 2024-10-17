import styled from 'styled-components';
import { colors } from './theme/colors';
import { WIDTH_BOUNDARY_SMALL } from './constants/layout';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colors.LEAD};

  @media (max-width: ${WIDTH_BOUNDARY_SMALL}) {
    font-size: 0.875em;
  }
`;

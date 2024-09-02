import styled from 'styled-components';
import { colors } from './theme/colors';
import { MAX_WIDTH } from './constants/layout';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${colors.LEAD};

  @media (max-width: ${MAX_WIDTH}) {
    font-size: 0.875em;
  }
`;

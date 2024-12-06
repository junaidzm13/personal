import React from 'react';
import styled from 'styled-components';
import { SpanWithTypingAnimation } from './SpanWithTypingAnimation';

export const NameAndSummary: React.FC = () => {
  return (
    <Wrapper>
      <span className="name">Junaid Malik</span>
      <SpanWithTypingAnimation className={'summary'} texts={summaryTexts} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 0.25em;

  > .summary {
    font-size: 1.25em;
  }

  > .name {
    font-family: Georgia;
    font-size: 3em;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

const summaryTexts = [
  `Technology evangelist with 3 years of professional full-stack development and data engineering experience.`,
  `His willingness to learn and ability to adapt has equipped him with expertise in a range of languages, tech stacks and programming paradigms.`,
  `Has a stong focus on fundamentals and a track recod of delivering simple solutions to complex problems.`,
];

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
  `A driven and talented software engineer with 3 years of professional full-stack development experience.`,
  `Focused on delivering clean scalable solutions to complex problems.`,
  `His willingness to learn and ability to adapt has equipped him with expertise in a range of tech stacks and programming paradigms.`,
  `Has wide breadth of experience including DevOps, Cloud, WebDev and Data Engineering.`,
  `Is committed to continuous learning and adept at mastering new technologies.`,
];

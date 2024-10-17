import React from 'react';
import { CodeBlock } from 'react-code-blocks';
import { CodeBlockProps } from 'react-code-blocks/dist/components/CodeBlock';
import styled from 'styled-components';

type Props = CodeBlockProps;

export const CodeSnippet: React.FC<Props> = props => {
  return (
    <StyledCode>
      <CodeBlock {...props} />
    </StyledCode>
  );
};

const StyledCode = styled.code`
  font-size: 0.875em;
`;
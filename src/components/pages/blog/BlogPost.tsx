import React from 'react';
import { blogs } from './BlogsPage';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostWrapper } from './posts/PostWrapper';

export const BlogPost: React.FC = () => {
  const { id } = useParams();

  const props = blogs.find(b => b.id === id);

  return (
    <Wrapper>
      {props === undefined ? (
        <h1>{'404 Not Found :('}</h1>
      ) : (
        <PostWrapper {...props}>{props?.component() ?? null}</PostWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 2em;
`;

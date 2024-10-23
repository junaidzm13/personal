import React from 'react';
import { BlogTag, blogTagByType, BlogTagType } from './BlogTag';
import styled from 'styled-components';

type Props = {
  tag: BlogTag;
};

export const Tag: React.FC<Props> = ({ tag }) => (
  <Wrapper {...colorByTagType[blogTagByType[tag]]}>
    <span>{tag}</span>
  </Wrapper>
);

const Wrapper = styled.div<Color>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;

  padding: 0.375em;

  border-radius: 2em;
  background-color: ${props => props.lightShade};
  color: ${props => props.darkShade};
  border: solid 0.0675em ${props => props.darkShade};
`;

type Color = {
  lightShade: string;
  darkShade: string;
};

const colorByTagType: Record<BlogTagType, Color> = {
  [BlogTagType.Fundamental]: {
    lightShade: '#D3F8D3',
    darkShade: '#116F11',
  },
  [BlogTagType.Technology]: {
    lightShade: '#C4E3ED',
    darkShade: '#2A7189',
  },
  [BlogTagType.Language]: {
    lightShade: '#FFCCCC',
    darkShade: '#FF3355',
  },
};

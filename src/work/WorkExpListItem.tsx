import React from 'react';
import styled from 'styled-components';
import { colors } from '../theme/colors';
import { MAX_WIDTH } from '../constants/layout';

export interface WorkExperienceItemProps {
  companyLogo: string;
  comapnyName: string;
  duration: string;
  jobTitle: string;
  description: Array<string>;
}

export const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
  description,
  duration,
  companyLogo,
  comapnyName,
  jobTitle,
}) => {
  return (
    <Wrapper>
      <HeadingWrapper>
        <CompanyLogo>
          <img
            src={`company-logos/${companyLogo}`}
            alt={`${comapnyName} Logo`}
          />
        </CompanyLogo>
        <Title>
          <JobTitle>{jobTitle}</JobTitle>
          <Duration>{`(${duration})`}</Duration>
        </Title>
      </HeadingWrapper>
      <BodyWrapper>
        <div className="line"></div>
        <ul>
          {description.map(d => (
            <li>{d}</li>
          ))}
        </ul>
      </BodyWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.GRAY};
  padding-left: 15%;
  padding-right: 15%;

  @media (max-width: ${MAX_WIDTH}) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;

  @media (max-width: ${MAX_WIDTH}) {
    flex-wrap: wrap;
    gap: 0;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  border-left: 2px solid ${colors.LEAD};
  padding-left: 7.5em;
  font-size: 1em;
  margin-left: 7.5em;

  @media (max-width: ${MAX_WIDTH}) {
    padding-left: 0;
    border-left: none;
    margin-left: 0;
    padding-bottom: 2em;
    border-bottom: 1px solid ${colors.LEAD};
  }

  > ul {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 80px;

  @media (max-width: ${MAX_WIDTH}) {
    width: 100%;
  }

  > img {
    width: 240px;
    height: 80px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.125em;
  width: 100%;
`;

const JobTitle = styled.span`
  font-weight: bold;
  font-size: 1.25em;
  color: ${colors.LEAD};
`;

const Duration = styled.span`
  color: gray;
  font-style: italic;
  font-size: 1em;
`;

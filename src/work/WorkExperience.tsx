import React from 'react';
import styled from 'styled-components';
import { WorkExperienceItem, WorkExperienceItemProps } from './WorkExpListItem';
import { colors } from '../theme/colors';
import { MAX_WIDTH } from '../constants/layout';

export const WorkExperience: React.FC = () => {
  return (
    <Wrapper>
      {workExperiences.map(exp => (
        <WorkExperienceItem {...exp} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0em;
  background-color: ${colors.GRAY};
  padding-top: 1em;
  padding-bottom: 1em;
  margin-bottom: 2em;

  @media (max-width: ${MAX_WIDTH}) {
    font-size: 0.875em;
    gap: 2em;
  }
`;

const workExperiences: Array<WorkExperienceItemProps> = [
  {
    companyLogo: 'ubs.svg',
    comapnyName: 'UBS Group AG',
    duration: 'Aug 2023 - Current',
    jobTitle: 'Software Engineer',
    description: [
      'Worked with various teams/projects, paradigms and tech-stacks as a full-stack developer.',
      'Currently migrating our event-driven microservices architecture (Kotlin, Java, SpringBoot, Kafka, TypeScript, React) from on-prem cloud to Microsoft Azure.',
      'Developed web services using functional data-driven workflows in Clojure.',
      'Migrated legacy applications running on VM to on-prem cloud.',
      'APAC lead developer for a UBS open-source project https://github.com/finos/vuu (Scala, Ignite, TypeScript, React).',
    ],
  },
  {
    companyLogo: 'credit-suisse.svg',
    comapnyName: 'Credit Suisse Group AG',
    duration: 'Mar 2022 - Aug 2023',
    jobTitle: 'Software Engineer',
    description: [
      'Server-side development in data distribution team using Spark, HDFS, Scala, Java and SpringBoot.',
      'Full-stack developer in a client facing team responsible for digital advisory, content distribution and product catalog using TypeScript, React, NodeJS and MongoDB.',
    ],
  },
  {
    companyLogo: 'credit-suisse.svg',
    comapnyName: 'Credit Suisse Group AG',
    duration: 'Jun 2021 - Aug 2021',
    jobTitle: 'Software Engineer Intern',
    description: [
      'Built automated data pipelines to extract and ingest internal/external data and enrich our equity offerings and enhance the products similarity search algorithm using Prefect, Dask, NLP, Unsupervised ML.',
    ],
  },
  {
    companyLogo: 'hku.svg',
    comapnyName: 'University of Hong Kong',
    duration: 'Feb 2021 - Jun 2021',
    jobTitle: 'Research Assistant, Dept. of Computer Science',
    description: [
      'Collaborated on a Deep Learning project involving DNNs, auto-encoders and transformers to generate a sequence of frames to project how a given hand-written text might have been initially drawn.',
    ],
  },
];

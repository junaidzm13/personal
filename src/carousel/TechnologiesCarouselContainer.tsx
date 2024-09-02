import React from 'react';
import styled from 'styled-components';
import { CarouselImage, InfiniteCarousel } from './InfiniteCarousel';
import { colors } from '../theme/colors';

export const TechnologiesCarouselContainer: React.FC = () => (
  <Wrapper>
    <div className="infinite-carousel-heading">
      <span>
        Few of the technologies I have extensively used in production settings
      </span>
    </div>
    <InfiniteCarousel imgs={logos} />
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: white;
  padding: 1em 0;

  > .infinite-carousel-heading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 1em;

    > span {
      font-size: 1.125em;
      color: ${colors.LEAD};
      text-align: center;
      padding: 0 0.25em 0;
    }
  }
`;

const logos: Array<CarouselImage> = [
  { src: 'technologies/scala.svg', alt: 'Scala Logo' },
  { src: 'technologies/clojure.svg', alt: 'Clojure Logo' },
  { src: 'technologies/python.svg', alt: 'Python Logo' },
  { src: 'technologies/typescript.svg', alt: 'TypeScript Logo' },
  { src: 'technologies/java.svg', alt: 'Java Logo' },

  { src: 'technologies/react.png', alt: 'React Logo' },
  { src: 'technologies/spring.svg', alt: 'Spring Logo' },

  { src: 'technologies/github.svg', alt: 'GitHub Logo' },
  { src: 'technologies/gitlab.svg', alt: 'GitLab Logo' },

  { src: 'technologies/mongodb.svg', alt: 'MongoDB Logo' },
  { src: 'technologies/kafka.svg', alt: 'Apache Kafka Logo' },
  { src: 'technologies/redis.svg', alt: 'Redis Logo' },
  { src: 'technologies/spark.svg', alt: 'Apache Spark Logo' },

  { src: 'technologies/docker.svg', alt: 'Docker Logo' },
  { src: 'technologies/kubernetes.svg', alt: 'Kubernetes Logo' },
  { src: 'technologies/helm.svg', alt: 'HelmCharts Logo' },
  { src: 'technologies/linux.svg', alt: 'Linus Logo' },
];

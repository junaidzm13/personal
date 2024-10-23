import React from 'react';
import styled from 'styled-components';
import { InfiniteCarousel } from './InfiniteCarousel';
import { colors } from '../../../../theme/colors';

export const TechnologiesCarouselContainer: React.FC = () => (
  <Wrapper>
    <div className="infinite-carousel-heading">
      <span>Few of the technologies used in production settings</span>
    </div>
    <InfiniteCarousel
      imgs={logos.map(logo => ({
        ...logo,
        item: {
          node: (
            <ThreeStars filled={logo.filledStars} className="bottom-right" />
          ),
        },
      }))}
    />
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

const ThreeStars: React.FC<{ filled: number; className?: string }> = ({
  filled,
  className,
}) => {
  const starColors = { filled: '#ffd700', unfilled: 'lightgray' };

  const stars = Array(3)
    .fill(null)
    .map((_, i) => (i + 1 <= filled ? starColors.filled : starColors.unfilled));

  return (
    <div className={className}>
      {stars.map((color, i) => (
        <Star key={i} color={color}>
          ★
        </Star>
      ))}
    </div>
  );
};

const Star = styled.span<{ color: string }>`
  font-size: 0.5em;
  color: ${props => props.color};
`;

const logos: Array<{ src: string; alt: string; filledStars: number }> = [
  // Languages
  { src: 'technologies/scala.svg', alt: 'Scala Logo', filledStars: 3 },
  {
    src: 'technologies/clojure.svg',
    alt: 'Clojure Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/python.svg',
    alt: 'Python Logo',
    filledStars: 1,
  },
  {
    src: 'technologies/typescript.svg',
    alt: 'TypeScript Logo',
    filledStars: 3,
  },
  { src: 'technologies/kotlin.svg', alt: 'Kotlin Logo', filledStars: 3 },
  { src: 'technologies/java.svg', alt: 'Java Logo', filledStars: 3 },

  // Web
  { src: 'technologies/react.png', alt: 'React Logo', filledStars: 3 },
  {
    src: 'technologies/spring.svg',
    alt: 'Spring Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/nginx.svg',
    alt: 'NginX Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/django.svg',
    alt: 'Django Logo',
    filledStars: 1,
  },

  // Databases / DataEngineering
  {
    src: 'technologies/mongodb.svg',
    alt: 'MongoDB Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/postgresql.svg',
    alt: 'Postgres Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/kafka.svg',
    alt: 'Apache Kafka Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/redis.svg',
    alt: 'Redis Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/spark.svg',
    alt: 'Apache Spark Logo',
    filledStars: 1,
  },

  // DevOps
  {
    src: 'technologies/docker.svg',
    alt: 'Docker Logo',
    filledStars: 3,
  },
  {
    src: 'technologies/kubernetes.svg',
    alt: 'Kubernetes Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/helm.svg',
    alt: 'HelmCharts Logo',
    filledStars: 1,
  },
  {
    src: 'technologies/grafana.svg',
    alt: 'Grafana Logo',
    filledStars: 1,
  },
  {
    src: 'technologies/prometheus.svg',
    alt: 'Prometheus Logo',
    filledStars: 1,
  },
  {
    src: 'technologies/github.svg',
    alt: 'GitHub Logo',
    filledStars: 2,
  },
  {
    src: 'technologies/gitlab.svg',
    alt: 'GitLab Logo',
    filledStars: 3,
  },

  // Misc
  {
    src: 'technologies/linux.svg',
    alt: 'Linux Logo',
    filledStars: 2,
  },
];

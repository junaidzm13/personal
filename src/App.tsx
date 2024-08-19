import React from 'react';
import { Header } from './header/Header';
import { AppContainer } from './AppContainer';
import { Introduction } from './introduction/Introduction';
import { Footer } from './footer/Footer';
import { CarouselImage, InfiniteCarousel } from './carousel/InfiniteCarousel';

function App() {
  return (
    <AppContainer>
      <Header />
      <Introduction />
      <InfiniteCarousel imgs={logos} />
      <Footer />
    </AppContainer>
  );
}

const logos: Array<CarouselImage> = [
  { src: 'technologies/scala.svg', alt: 'Scala Logo' },
  { src: 'technologies/clojure.svg', alt: 'Clojure Logo' },
  { src: 'technologies/python.svg', alt: 'Python Logo' },
  { src: 'technologies/typescript.svg', alt: 'TypeScript Logo' },
  { src: 'technologies/java.svg', alt: 'Java Logo' },

  { src: 'technologies/react.png', alt: 'React Logo' },
  { src: 'technologies/spring.svg', alt: 'Spring Logo' },

  { src: 'technologies/github.svg', alt: 'GitHub Logo' },

  { src: 'technologies/mongodb.svg', alt: 'MongoDB Logo' },
  { src: 'technologies/kafka.svg', alt: 'Apache Kafka Logo' },
  { src: 'technologies/redis.svg', alt: 'Redis Logo' },
  { src: 'technologies/spark.svg', alt: 'Apache Spark Logo' },

  { src: 'technologies/docker.svg', alt: 'Docker Logo' },
  { src: 'technologies/kubernetes.svg', alt: 'Kubernetes Logo' },
  { src: 'technologies/helm.svg', alt: 'HelmCharts Logo' },
  { src: 'technologies/linux.svg', alt: 'Linus Logo' },
];

export default App;

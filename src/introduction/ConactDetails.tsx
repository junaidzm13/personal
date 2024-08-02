import React from 'react';
import styled from 'styled-components';

export const ContactDetails: React.FC = () => {
  return (
    <ContactWrapper>
      <span className="email">junaidzmalik7@gmail.com</span>
      <Links>
        {profiles.map(p => (
          <ProfileSvg {...p} />
        ))}
      </Links>
    </ContactWrapper>
  );
};

const profiles = [
  {
    src: 'linkedin.svg',
    alt: 'LinkedIn logo',
    href: 'https://linkedin.com/in/junaid-z-malik',
  },
  {
    src: 'github.svg',
    alt: 'GitHub logo',
    href: 'https://github.com/junaidzm13?tab=repositorie',
  },
] as const;

const ProfileSvg: React.FC<{ src: string; alt: string; href: string }> = ({
  src,
  alt,
  href,
}) => (
  <a href={href}>
    <img src={src} alt={alt} />
  </a>
);

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  justify-content: end;
  align-items: start;
  width: 100%;

  > .email {
    font-weight: bold;
    font-size: 1.125em;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 0.5em;
  height: 100%;

  > a > img {
    height: 3em;
  }
`;

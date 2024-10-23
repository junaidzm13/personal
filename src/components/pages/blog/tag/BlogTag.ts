export enum BlogTag {
  React = 'React',
  CleanCode = 'CleanCode',
  DesignPatterns = 'DesignPatterns',
  Kotlin = 'Kotlin',
  SpringBoot = 'SpringBoot',
  TypeScript = 'TypeScript',
}

export enum BlogTagType {
  Fundamental = 'Fundamental',
  Technology = 'Technology',
  Language = 'Language',
}

export const blogTagByType: Record<BlogTag, BlogTagType> = {
  [BlogTag.CleanCode]: BlogTagType.Fundamental,
  [BlogTag.DesignPatterns]: BlogTagType.Fundamental,
  [BlogTag.Kotlin]: BlogTagType.Language,
  [BlogTag.React]: BlogTagType.Technology,
  [BlogTag.SpringBoot]: BlogTagType.Technology,
  [BlogTag.TypeScript]: BlogTagType.Language,
};

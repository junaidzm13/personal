export enum BlogTag {
  React = 'React',
  CleanCode = 'CleanCode',
  DesignPatterns = 'DesignPatterns',
  Databases = 'Databases',
  Ignite = 'Ignite',
  Kotlin = 'Kotlin',
  Scala = 'Scala',
  SpringBoot = 'SpringBoot',
  SQL = 'SQL',
  TypeScript = 'TypeScript',
}

export enum BlogTagType {
  Fundamental = 'Fundamental',
  Technology = 'Technology',
  Language = 'Language',
}

export const blogTagByType: Record<BlogTag, BlogTagType> = {
  [BlogTag.CleanCode]: BlogTagType.Fundamental,
  [BlogTag.Databases]: BlogTagType.Fundamental,
  [BlogTag.DesignPatterns]: BlogTagType.Fundamental,
  [BlogTag.Ignite]: BlogTagType.Technology,
  [BlogTag.Kotlin]: BlogTagType.Language,
  [BlogTag.React]: BlogTagType.Technology,
  [BlogTag.Scala]: BlogTagType.Language,
  [BlogTag.SpringBoot]: BlogTagType.Technology,
  [BlogTag.SQL]: BlogTagType.Language,
  [BlogTag.TypeScript]: BlogTagType.Language,
};

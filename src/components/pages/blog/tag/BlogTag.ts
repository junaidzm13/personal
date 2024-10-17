export enum BlogTag {
  React = 'React',
  CleanCode = 'CleanCode',
  DesignPatterns = 'DesignPatterns',
  Kotlin = 'Kotlin',
  TypeScript = 'TypeScript',
}

export enum BlogTagType {
  Fundamental = 'Fundamental',
  Technology = 'Technology',
  Paradigm = 'Paradigm',
}

export const blogTagByType: Record<BlogTag, BlogTagType> = {
  [BlogTag.CleanCode]: BlogTagType.Fundamental,
  [BlogTag.DesignPatterns]: BlogTagType.Fundamental,
  [BlogTag.Kotlin]: BlogTagType.Technology,
  [BlogTag.React]: BlogTagType.Technology,
  [BlogTag.TypeScript]: BlogTagType.Technology,
};

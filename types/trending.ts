export interface TrendingRepoData {
  author: string;
  name: string;
  avatar: string;
  description?: string;
  url: string;
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
  currentPeriodStars: number;
  builtBy: BuiltBy[];
}

interface BuiltBy {
  username: string;
  href: string;
  avatar: string;
}

export interface TrendingRequestParams {
  language?: string;
  since?: string;
}

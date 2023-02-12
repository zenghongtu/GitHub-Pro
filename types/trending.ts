export interface TrendingRequestParams {
  language?: string;
  since?: string;
  type?: 'repositories' | 'developers';
}

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

export interface TrendingDeveloperData {
  username: string;
  name: string;
  url: string;
  sponsorUrl?: any;
  avatar: string;
  repo: Repo;
}

interface Repo {
  name: string;
  description: string;
  url: string;
}

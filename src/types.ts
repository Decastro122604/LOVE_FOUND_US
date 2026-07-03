export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  badge?: string;
  extendedText?: string[];
}

export interface ReassuranceQuote {
  id: string;
  text: string;
  author: string;
  category: 'love' | 'faith' | 'reassurance' | 'patience';
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
}

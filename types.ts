
export type EventType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

export type Session = {
  id: string;
  date: string;
  totalSpins: number;
  events: Record<string, number>;
  note?: string;
};

export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum AppLanguage {
  VI = 'vi',
  EN = 'en'
}

export interface AppState {
  isPro: boolean;
  theme: AppTheme;
  language: AppLanguage;
  sessions: Session[];
  activeEvents: EventType[];
}


export interface ImageState {
  original: string | null;
  edited: string | null;
  prompt: string;
  isProcessing: boolean;
  error: string | null;
}

export enum UserPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export interface UserProfile {
  plan: UserPlan;
  credits: number;
}

export interface User {
    id: string;
    name: string | undefined; // Changed from `string | null`
    username: string | undefined; // Changed from `string | null`
    email: string | undefined; // Changed from `string | null`
    image?: string | undefined;
    emailVerified?: string | undefined;
    createdAt?: string | undefined;
    isOAuth: boolean;
  }
  
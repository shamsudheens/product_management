export interface User {
  id?: number;
  username: string;
  password?: string; // Optional because we might not select it or exclude it in responses
  created_at?: Date;
}

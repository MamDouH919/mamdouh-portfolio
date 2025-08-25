export interface Database {
  public: {
    Tables: {
      visitors: {
        Row: {
          id: string;
          cookie_id: string;
          theme: 'light' | 'dark' | 'system';
          user_agent: string | null;
          ip_address: string | null;
          visited_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          cookie_id: string;
          theme: 'light' | 'dark' | 'system';
          user_agent?: string | null;
          ip_address?: string | null;
          visited_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          cookie_id?: string;
          theme?: 'light' | 'dark' | 'system';
          user_agent?: string | null;
          ip_address?: string | null;
          visited_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

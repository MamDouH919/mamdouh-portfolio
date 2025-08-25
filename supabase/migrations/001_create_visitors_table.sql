-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cookie_id TEXT NOT NULL,
  theme TEXT NOT NULL CHECK (theme IN ('light', 'dark', 'system')),
  user_agent TEXT,
  ip_address INET,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_cookie_id ON visitors(cookie_id);
CREATE INDEX IF NOT EXISTS idx_visitors_theme ON visitors(theme);
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON visitors(visited_at);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);

-- Create unique constraint on cookie_id to prevent duplicates
-- Note: This is commented out as we want to track multiple visits per visitor
-- CREATE UNIQUE INDEX IF NOT EXISTS idx_visitors_unique_cookie ON visitors(cookie_id);

-- Enable Row Level Security (RLS)
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on visitors" ON visitors
  FOR ALL USING (true);

-- Create function to update created_at timestamp
CREATE OR REPLACE FUNCTION update_created_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update created_at
CREATE TRIGGER update_visitors_created_at 
  BEFORE INSERT ON visitors 
  FOR EACH ROW 
  EXECUTE FUNCTION update_created_at_column();

-- Insert some sample data for testing (optional)
-- INSERT INTO visitors (cookie_id, theme, user_agent) VALUES 
--   ('vis_1234567890_test1', 'light', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
--   ('vis_1234567890_test2', 'dark', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
--   ('vis_1234567890_test3', 'system', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36');

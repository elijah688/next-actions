CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Automatically generate UUID for the id
  title TEXT NOT NULL,                            -- Title of the note (required field)
  content TEXT NOT NULL,                          -- Content of the note (required field)
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Timestamp of the last update (required field, auto-updated)
);


-- Inserting Note 1
INSERT INTO notes (title, content, updated_at)
VALUES
  ('Meeting Notes', 'Discussed the quarterly budget, set new team goals, and finalized the project timelines.', '2025-01-22 10:00:00');

-- Inserting Note 2
INSERT INTO notes (title, content, updated_at)
VALUES
  ('Project Kickoff', 'Introduced the new project, outlined the objectives, and assigned initial tasks to the team.', '2025-01-22 14:30:00');

-- Inserting Note 3
INSERT INTO notes (title, content, updated_at)
VALUES
  ('Code Review Feedback', 'Reviewed code for the new feature, added suggestions, and recommended optimizations for performance.', '2025-01-23 09:15:00');

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT NOT NULL, -- Relacionado ao post ou página
  user_id UUID,         -- ID do usuário (opcional se usar autenticação com Supabase)
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
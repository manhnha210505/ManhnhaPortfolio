-- ============================================================
-- seed.sql — v1 portfolio content
--
-- Regenerated from the live Supabase project (applied as migration
-- 20260807072101_seed_portfolio_content). Content source of truth is
-- .docs/playbooks/*.md; this file is the reproducible DB projection.
--
-- Conventions kept deliberately (no new columns for either):
--   course context -> tags entry  'course:<context>'
--   quantified metric -> tags entry  'metric:<label>=<value>'
--
-- Idempotent: unique indexes below let every insert use ON CONFLICT.
-- Apply after schema.sql.
-- ============================================================

create unique index if not exists profile_full_name_key on profile (full_name);
create unique index if not exists education_school_key on education (school);
create unique index if not exists skills_category_name_key on skills (category, name);

-- --- profile ---
insert into profile (full_name, display_name, tagline, bio, email, github_url, linkedin_url, location, career_goal, short_term_goal, long_term_goal, target_company_type, hobbies, show_hobbies, avatar_url, resume_url) values
  ('Trần Đăng Mạnh', 'manhnha', 'Data Science Engineer', 'I''m Mạnh (manhnha), a Data Science student at HUFLIT (Ho Chi Minh City University of Foreign Languages – Information Technology), expecting to graduate in 2027. My focus spans the full Data Science lifecycle — from statistical analysis and classical ML to deep learning architectures like Vision Transformers, and the MLOps/backend work needed to actually ship a model.

Outside of coursework, I lead student project teams — most recently building an image captioning system from a ViT encoder + Transformer decoder, and a spam classifier using k-NN. I''m the kind of person who''ll happily lose a few hours deep in a new AI paper or a debugging session, and I''m just as happy to be in the kitchen or meeting new people when I''m not at the keyboard.', 'manhnha210505@gmail.com', 'https://github.com/manhnha210505', null, 'Biên Hòa, Đồng Nai, Vietnam', null, null, null, null, 'When I''m not building models: cooking, chasing the latest in AI, and meeting new people.', true, null, null)
on conflict (full_name) do nothing;

-- --- education ---
insert into education (school, major, start_date, end_date, gpa, highlights, sort_order) values
  ('HUFLIT — Ho Chi Minh City University of Foreign Languages – Information Technology', 'Data Science', '2023-09-01', null, '3.4/4.0', null, 0)
on conflict (school) do nothing;

-- --- skills (30 rows) ---
insert into skills (category, name, is_core, sort_order) values
  ('backend', 'Next.js API routes / server actions', false, 0),
  ('backend', 'Supabase (DB, auth)', false, 1),
  ('backend', 'RESTful API design', false, 2),
  ('cloud', 'Cloudflare (Pages/Workers, DNS)', false, 0),
  ('cloud', 'Vercel', false, 1),
  ('data_science', 'EDA & feature engineering', true, 0),
  ('data_science', 'Applied statistics (distance metrics, precision/recall/F1)', true, 1),
  ('data_science', 'Text preprocessing (NLP tokenization)', true, 2),
  ('data_visualization', 'Matplotlib', true, 0),
  ('data_visualization', 'Seaborn', true, 1),
  ('data_visualization', 'Plotly', true, 2),
  ('frameworks', 'scikit-learn, PyTorch / TensorFlow', false, 0),
  ('frameworks', 'pandas, NumPy', false, 1),
  ('frameworks', 'Next.js, React, Tailwind CSS', false, 2),
  ('frameworks', 'shadcn/ui, Motion', false, 3),
  ('languages', 'Python', false, 0),
  ('languages', 'TypeScript / JavaScript', false, 1),
  ('languages', 'SQL', false, 2),
  ('machine_learning', 'k-NN, Naive Bayes, Decision Tree', true, 0),
  ('machine_learning', 'Gradient Descent, Logistic Regression, K-Means', true, 1),
  ('machine_learning', 'CNN, RNN/LSTM, Transformer, ViT', true, 2),
  ('machine_learning', 'Computer Vision (encoder-decoder captioning)', true, 3),
  ('machine_learning', 'Model evaluation (BLEU, cross-validation)', true, 4),
  ('mlops', 'Experiment tracking', true, 0),
  ('mlops', 'Basic model deployment', true, 1),
  ('mlops', 'Basic CI/CD', true, 2),
  ('tools', 'Git', false, 0),
  ('tools', 'Jupyter', false, 1),
  ('tools', 'Docker', false, 2),
  ('tools', 'Tailscale', false, 3)
on conflict (category, name) do nothing;

-- --- projects ---
insert into projects (title, slug, summary, problem, approach, impact, role, is_team_project, team_size, repo_url, demo_url, cover_image_url, tags, sort_order, published) values
  ('Image Captioning', 'image-captioning', 'An image captioning system combining a Vision Transformer encoder with a Transformer decoder — generating natural-language descriptions of images end to end.', 'Recent progress in multi-modal deep learning (VQA, text-to-image, NLVR — DALL·E being the clearest example) motivated the team to explore the reverse direction: image-to-text. The goal was a model that generates accurate natural-language captions from images, useful for content search and accessibility use cases. Vision Transformer''s shift from convolution to self-attention — learning global relationships from the earliest layers instead of only in deep layers — made it a strong fit for a task that requires understanding context and spatial relationships between objects, not just detecting them individually.', 'An encoder-decoder architecture: ViT as the encoder producing image embeddings, paired with a Transformer decoder generating the caption sequence. Trained and evaluated on Flickr8k.', 'BLEU-4 of 0.1883, outperforming CNN+LSTM baselines.', 'Team Lead', true, 4, 'https://github.com/manhnha210505/image_captioning', null, null, array['course:Computer Vision course, HUFLIT', 'metric:BLEU-4=0.1883', 'Python', 'PyTorch', 'Vision Transformer (ViT)', 'Transformer', 'Flickr8k'], 0, true),
  ('Spam Classification with k-Nearest Neighbors', 'spam-classification-knn', 'A spam email classifier built on k-NN with TF-IDF feature vectors, comparing four distance metrics to find the most effective similarity measure.', 'Spam filtering needs to keep adapting as spam content evolves — traditional rule-based filtering falls behind, exposing users to phishing and malware risk. This motivated applying a machine learning approach that classifies based on similarity to previously labeled examples rather than fixed rules.', 'Emails vectorized with TF-IDF (term importance weighting), classified via k-NN majority vote across the k nearest neighbors, comparing Cosine, Euclidean, Manhattan, and Minkowski distance metrics.', 'At k=5 — Accuracy 96%, Precision 97.3%, Recall 93.5%.', 'Team Lead', true, 3, 'https://github.com/manhnha210505/classify_spam_using_k_nearest_neighbors', null, null, array['course:Machine Learning course, HUFLIT', 'metric:Accuracy=96%', 'metric:Precision=97.3%', 'metric:Recall=93.5% at k=5', 'Python', 'scikit-learn', 'k-NN', 'TF-IDF'], 1, true)
on conflict (slug) do nothing;

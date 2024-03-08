CREATE TABLE anime (
    anime_id SERIAL PRIMARY KEY,
    mal_id INTEGER UNIQUE, 
    anilist_id INTEGER UNIQUE NOT NULL, 
    title_romaji TEXT,
    title_romaji_slug TEXT NOT NULL,
    title_english TEXT,
    description TEXT,
    episodes INT,
    duration INT,
    cover_extra_large_image TEXT,
    cover_medium_image TEXT,
    season TEXT,
    season_year TEXT,
    format TEXT
);

CREATE TABLE episode (
    episode_id SERIAL PRIMARY KEY,
    anime_id INT REFERENCES anime(anime_id),
    episode_number TEXT NOT NULL,
    episode_thumbnail TEXT,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    views INTEGER DEFAULT 0,
    UNIQUE (anime_id, episode_number)
);

CREATE TABLE translator (
    translator_id SERIAL PRIMARY KEY,
    translator_name TEXT UNIQUE NOT NULL,
    translator_info TEXT,
    translator_logo TEXT,
    translator_website TEXT,
    translator_discord TEXT,
    translator_banner TEXT
);

CREATE TABLE url (
    url_id SERIAL PRIMARY KEY,
    episode_id INT REFERENCES episode(episode_id),
    url TEXT UNIQUE NOT NULL,
    player_name TEXT NOT NULL,
    translator_episode_link TEXT,
    translator_id INT REFERENCES translator(translator_id)
);

CREATE TABLE genre (
    genre_id SERIAL PRIMARY KEY,
    genre TEXT UNIQUE NOT NULL
);

CREATE TABLE anime_genre (
    anime_id INT REFERENCES anime(anime_id),
    genre_id INT REFERENCES genre(genre_id),
    PRIMARY KEY (anime_id, genre_id)
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES next_auth.users(id),
    episode_id INT REFERENCES episode(episode_id),
    comment_text TEXT NOT NULL,
    create_date TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
    update_date TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
);


DROP TABLE anime CASCADE;
DROP TABLE episode CASCADE;
DROP TABLE translator CASCADE;
DROP TABLE url CASCADE;
DROP TABLE genre CASCADE;
DROP TABLE anime_genre CASCADE;

CREATE OR REPLACE FUNCTION fetch_animes(search_query TEXT = ''::TEXT, page_size INT = 25::INT, anime_format TEXT = ''::TEXT, genres TEXT[] = '{}'::TEXT[] , page INT = 1::INT)
RETURNS SETOF anime AS $$
BEGIN
  IF genres IS NULL OR genres ='{}' THEN
    RETURN QUERY 
      SELECT *
      FROM anime a
      WHERE (anime_format IS NULL OR anime_format = '' OR a.format IS NULL OR LOWER(a.format) = anime_format)
      AND (LOWER(a.title_romaji) ~* ('\s*' || search_query || '\s*') OR LOWER(a.title_english) ~* ('\s*' || search_query || '\s*'))
      ORDER BY a.title_romaji
      OFFSET (page - 1) * page_size
      LIMIT page_size;
  ELSE
    RETURN QUERY 
      SELECT a.*
      FROM anime a
      JOIN anime_genre ag ON a.anime_id = ag.anime_id
      JOIN genre g ON ag.genre_id = g.genre_id
      WHERE g.genre = ANY(genres) AND (anime_format IS NULL OR anime_format = '' OR a.format IS NULL OR LOWER(a.format) = anime_format)
      AND (LOWER(a.title_romaji) ~* ('\s*' || search_query || '\s*') OR LOWER(a.title_english) ~* ('\s*' || search_query || '\s*'))
      GROUP BY a.anime_id
      HAVING COUNT(DISTINCT g.genre) = array_length(genres, 1)
      ORDER BY a.title_romaji
      OFFSET (page - 1) * page_size
      LIMIT page_size;
  END IF;
END; $$
LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fetch_total_pages(anime_format TEXT, genres TEXT[])
RETURNS SETOF anime AS $$
BEGIN
  IF genres IS NULL OR genres ='{}' THEN
    RETURN QUERY 
      SELECT *
      FROM anime a
      WHERE (anime_format IS NULL OR anime_format = '' OR a.format IS NULL OR LOWER(a.format) = anime_format);
  ELSE
    RETURN QUERY 
      SELECT a.*
      FROM anime a
      JOIN anime_genre ag ON a.anime_id = ag.anime_id
      JOIN genre g ON ag.genre_id = g.genre_id
      WHERE g.genre = ANY(genres) AND (anime_format IS NULL OR anime_format = '' OR a.format IS NULL OR LOWER(a.format) = anime_format)
      GROUP BY a.anime_id
      HAVING COUNT(DISTINCT g.genre) = array_length(genres, 1);
  END IF;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_anime_formats()
RETURNS TABLE(format text) AS
$$
BEGIN
  RETURN QUERY SELECT LOWER(a.format) FROM anime a GROUP BY a.format;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fetch_anime_by_translator_name(name TEXT)
RETURNS SETOF anime AS $$
BEGIN
  RETURN QUERY SELECT a.*
  FROM anime a
  LEFT JOIN episode e ON e.anime_id = a.anime_id
  LEFT JOIN url u ON u.episode_id = e.episode_id
  LEFT JOIN translator t ON u.translator_id = t.translator_id
  WHERE t.translator_name = name
  GROUP BY a.anime_id;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_newest_episodes(_limit INT)
RETURNS TABLE(
  anime_id int,
  cover_extra_large_image text,
  cover_medium_image text,
  description text,
  duration int,
  episodes int,
  format text,
  mal_id int,
  anilist_id int,
  season text,
  season_year text,
  title_english text,
  title_romaji text,
  title_romaji_slug text,
  create_date timestamp,
  update_date timestamp,
  episode_id int,
  episode_number text,
  episode_thumbnail text,
  views int
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    a.anime_id,
    a.cover_extra_large_image,
    a.cover_medium_image,
    a.description,
    a.duration,
    a.episodes,
    a.format,
    a.mal_id,
    a.anilist_id,
    a.season,
    a.season_year,
    a.title_english,
    a.title_romaji,
    a.title_romaji_slug,
    e.create_date,
    e.update_date,
    e.episode_id,
    e.episode_number,
    e.episode_thumbnail,
    e.views
  FROM anime a 
  LEFT JOIN episode e ON a.anime_id = e.anime_id
  ORDER BY e.update_date DESC 
  LIMIT _limit;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_newest_episodes_from_translator(t_name text, _limit INT)
RETURNS TABLE(
  anime_id int,
  cover_extra_large_image text,
  cover_medium_image text,
  description text,
  duration int,
  episodes int,
  format text,
  mal_id int,
  anilist_id int,
  season text,
  season_year text,
  title_english text,
  title_romaji text,
  title_romaji_slug text,
  update_date timestamp,
  create_date timestamp,
  episode_id int,
  episode_number text,
  episode_thumbnail text,
  views int
) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    a.anime_id,
    a.cover_extra_large_image,
    a.cover_medium_image,
    a.description,
    a.duration,
    a.episodes,
    a.format,
    a.mal_id,
    a.anilist_id,
    a.season,
    a.season_year,
    a.title_english,
    a.title_romaji,
    a.title_romaji_slug,
    e.update_date,
    e.create_date,
    e.episode_id,
    e.episode_number,
    e.episode_thumbnail,
    e.views
  FROM anime a 
  LEFT JOIN episode e ON a.anime_id = e.anime_id 
  LEFT JOIN url u ON e.episode_id = u.episode_id 
  LEFT JOIN translator t ON u.translator_id = t.translator_id 
  WHERE t.translator_name = t_name
  GROUP BY a.anime_id, e.episode_id
  ORDER BY e.update_date DESC 
  LIMIT _limit;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fetch_episodes_by_slug(slug TEXT)
RETURNS SETOF episode AS $$
BEGIN
  RETURN QUERY SELECT e.*
  FROM episode e
  LEFT JOIN anime a ON a.anime_id = e.anime_id
  WHERE a.title_romaji_slug = slug
  ORDER BY e.episode_number::integer;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fetch_episodes_by_slug_and_number(slug TEXT, episode_number TEXT)
RETURNS SETOF episode AS $$
BEGIN
  RETURN QUERY SELECT e.*
  FROM episode e
  LEFT JOIN anime a ON a.anime_id = e.anime_id
  WHERE a.title_romaji_slug = slug
  AND e.episode_number = episodeNumber;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fetch_urls_by_slug_and_episode_number_test(slug TEXT, episode_num TEXT)
RETURNS TABLE (
    player_name TEXT,
    urls TEXT[],
    translator_names TEXT[],
    translator_logos TEXT[],
    episode_id INT,
) AS $$
BEGIN
  RETURN QUERY SELECT u.player_name, array_agg(u.url), array_agg(t.translator_name), array_agg(t.translator_logo), u.episode_id
  FROM url u
  LEFT JOIN episode e ON e.episode_id = u.episode_id
  LEFT JOIN anime a ON a.anime_id = e.anime_id
  LEFT JOIN translator t ON u.translator_id = t.translator_id
  WHERE a.title_romaji_slug = slug AND e.episode_number = episode_num
  GROUP BY u.player_name;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fetch_comments_with_users(ep_id INT)
RETURNS TABLE (
    comment_id INT,
    user_id UUID,
    episode_id INT,
    comment_text TEXT,
    create_date TIMESTAMPTZ,
    update_date TIMESTAMPTZ,
    id UUID,
    name TEXT,
    image TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.comment_id,
    c.user_id,
    c.episode_id,
    c.comment_text,
    c.create_date,
    c.update_date,
    u.id,
    u.name,
    u.image 
  FROM comment c
  LEFT JOIN next_auth.users u ON c.user_id = u.id
  WHERE c.episode_id = ep_id;
END; $$
LANGUAGE plpgsql;
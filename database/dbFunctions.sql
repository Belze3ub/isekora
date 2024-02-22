CREATE OR REPLACE FUNCTION fetch_animes(anime_format TEXT, genres TEXT[], page INT, page_size INT)
RETURNS SETOF anime AS $$
BEGIN
  IF genres IS NULL OR genres ='{}' THEN
    RETURN QUERY 
      SELECT *
      FROM anime a
      WHERE (anime_format IS NULL OR anime_format = '' OR a.format IS NULL OR LOWER(a.format) = anime_format)
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
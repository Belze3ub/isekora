# Isekora - Anime Streaming App

Isekora is a Next.js application that allows users to stream anime. The app uses Supabase for the database and Anilist API for anime information. It also includes user authentication, the ability to comment on episodes, real-time updates for new episodes, and a search functionality.

## Live Demo

You can access the live demo of the application at: [https://isekora.vercel.app](https://isekora.vercel.app)

## Features

1. **Authentication**:
   - Users can log in with their Google or Discord accounts.

2. **Real-Time Updates**:
   - When a new episode is added to the database, the UI is automatically updated, so users don't have to refresh the page to see the latest content.

3. **Search**:
   - Users can search for anime using the search button in the navbar.

4. **Home Page**:
   - Displays anime from the current season, the previous season, newly added episodes, and all available translator groups.

5. **Anime List Page (/anime)**:
   - Displays a list of all available anime.
   - Provides filtering options by format and genres.

6. **Anime Details Page (/anime/[slug])**:
   - Displays detailed information about a specific anime.
   - Shows all available episodes for the anime.
   - Displays related anime and recommended anime.

7. **Episode Page (/anime/[slug]/[episode_number])**:
   - Displays video player.
   - Provides option to switch between different players and translators.
   - Includes episode navigation to go to the previous or next episode, open in a new tab, or go back to the episode list.
   - Allows logged-in users to comment.

8. **Translators Page (/translators)**:
   - Displays a list of all available translator groups.

9. **Translator Details Page (/translators/[translator_name])**:
   - Displays information about a specific translator group.
   - Shows the latest episodes translated by this group.
   - Lists all the anime that this translator group has worked on.

## Technologies Used

- **Front-end**: Next.js, React, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase (with real-time subscriptions)
- **API**: Anilist API
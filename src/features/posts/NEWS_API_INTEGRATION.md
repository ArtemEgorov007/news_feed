# News API Integration

This document describes how the NewsAPI integration works in this project.

## Overview

Instead of using the placeholder JSONPlaceholder API, we now fetch real technology news using NewsAPI. This makes the content much more interesting and relevant, especially for users interested in technology, artificial intelligence, and neural networks.

## Implementation Details

### News Service

The [newsService.js](services/newsService.js) file contains methods to fetch technology news:

1. `fetchTechNews()` - Fetches articles related to technology, neural networks, and AI
2. `fetchTechHeadlines()` - Fetches top technology headlines

Both methods transform the NewsAPI response to match the existing post structure in the application.

### Store Actions

The [actions.js](store/actions.js) file was updated to use the news service instead of the placeholder API:

1. `fetchPosts()` - Now fetches technology headlines instead of placeholder posts
2. `loadMorePosts()` - Loads more technology news articles

### Components

The [PostItem.vue](components/PostItem.vue) component was enhanced to display additional information:

1. Source of the news article
2. Publication date
3. "Read Full Article" button that opens the original article in a new tab

## API Key Configuration

To use the NewsAPI integration:

1. Register for a free API key at [newsapi.org](https://newsapi.org/)
2. Create a `.env` file in the project root
3. Add your API key: `VITE_NEWS_API_KEY=your_actual_api_key_here`

## Fallback Content

When the API is not available or returns an error, the application shows fallback tech-related posts instead of the generic placeholder content.

## Filtering

The service is configured to fetch content related to:
- Technology
- Neural networks
- Artificial intelligence
- AI

This ensures that the content is relevant and interesting for tech enthusiasts.
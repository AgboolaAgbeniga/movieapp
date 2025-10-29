

# Moviepedia - Movie & TV Discovery Platform

A comprehensive web application for discovering movies and TV shows, powered by The Movie Database (TMDb) API. Features advanced search, detailed views, user watchlists, and responsive design.

## 🚀 Features

### Core Functionality
- **Advanced Search**: Search movies and TV shows with real-time suggestions and advanced filtering
- **Detailed Views**: Comprehensive information including cast, crew, reviews, and recommendations
- **Trailer Playback**: Watch trailers directly within the app
- **User Watchlist**: Save favorite movies and TV shows for later viewing
- **Dark/Light Mode**: Toggle between themes for better viewing experience

### Movie Features
- **Featured Movies**: Browse top-rated and popular movies
- **New Arrivals**: Discover recently released movies
- **Movie Details**: Synopsis, ratings, runtime, genres, cast, and crew
- **Similar Movies**: AI-powered recommendations
- **Movie Reviews**: User reviews and ratings
- **Cast Profiles**: Detailed actor information and filmography

### TV Series Features
- **Popular & Top-Rated TV Shows**: Curated collections
- **TV Show Details**: Seasons, episodes, cast, and crew information
- **Episode Information**: Detailed episode guides
- **TV Recommendations**: Similar shows based on viewing preferences

### Advanced Features
- **Genre Filtering**: Filter by multiple genres simultaneously
- **Year & Rating Filters**: Narrow down by release year and minimum rating
- **Sorting Options**: Sort by popularity, rating, release date, and more
- **Pagination**: Efficient browsing through large datasets
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Graceful error states and retry mechanisms
- **Loading States**: Skeleton screens for better user experience

## 🛠️ Technologies Used

### Frontend Framework
- **React 18**: Modern React with hooks and concurrent features
- **React Router**: Client-side routing for seamless navigation
- **React Modal**: Accessible modal dialogs

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic CSS vendor prefixing
- **Dark Mode Support**: System preference detection and manual toggle

### API Integration
- **The Movie Database (TMDb) API**: Comprehensive movie and TV data
- **Axios**: HTTP client for API requests (built into fetch)
- **API Configuration**: Dynamic image URL handling

### State Management & Data
- **Custom Hooks**: Reusable logic for API calls, themes, and watchlists
- **Local Storage**: Persistent watchlist functionality
- **Context API**: Global state management for movie data

### Development Tools
- **Create React App**: Build setup and development server
- **ESLint**: Code linting and quality assurance
- **Testing Library**: Component testing utilities

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 16 or higher) and npm installed on your machine
- **TMDb API Key**: Obtain a free API key by signing up at [TMDb API](https://www.themoviedb.org/settings/api)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

## 🚀 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the project root:
   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### Navigation
- **Homepage** (`/`): Featured movies and quick access to popular content
- **Movies** (`/movies`): Browse movies with filtering and search
- **TV Shows** (`/tv`): Discover TV series and shows
- **Movie/TV Details**: Click any movie or show for detailed information
- **Person Details**: Click on cast members to view their profiles

### Search & Discovery
- Use the search bar in the header for instant movie/TV search
- Apply filters for genres, release years, and minimum ratings
- Sort results by popularity, rating, or release date
- Browse curated collections (Popular, Top Rated, Upcoming, etc.)

### Watchlist
- Click the heart icon on any movie or TV show to add to your watchlist
- Access your saved items from the sidebar (future feature)
- Watchlist persists across browser sessions

### Dark/Light Mode
- Toggle between themes using the theme button in the header
- Automatically detects your system preference on first visit

## 📊 API Endpoints Used

### Movies
- `GET /movie/top_rated` - Top rated movies
- `GET /movie/popular` - Popular movies
- `GET /movie/now_playing` - Currently playing movies
- `GET /movie/upcoming` - Upcoming movie releases
- `GET /movie/{id}` - Movie details
- `GET /movie/{id}/videos` - Movie trailers
- `GET /movie/{id}/credits` - Cast and crew
- `GET /movie/{id}/similar` - Similar movies
- `GET /movie/{id}/recommendations` - Recommended movies
- `GET /movie/{id}/reviews` - User reviews

### TV Shows
- `GET /tv/popular` - Popular TV shows
- `GET /tv/top_rated` - Top rated TV shows
- `GET /tv/on_the_air` - Currently airing shows
- `GET /tv/airing_today` - Shows airing today
- `GET /tv/{id}` - TV show details
- `GET /tv/{id}/videos` - TV show trailers
- `GET /tv/{id}/credits` - Cast and crew
- `GET /tv/{id}/similar` - Similar TV shows
- `GET /tv/{id}/recommendations` - Recommended TV shows

### Search & Discovery
- `GET /search/movie` - Search movies
- `GET /search/tv` - Search TV shows
- `GET /discover/movie` - Discover movies with filters
- `GET /discover/tv` - Discover TV shows with filters

### People & Metadata
- `GET /person/{id}` - Person details
- `GET /person/{id}/images` - Person photos
- `GET /person/{id}/movie_credits` - Person's movie credits
- `GET /person/{id}/tv_credits` - Person's TV credits
- `GET /genre/movie/list` - Movie genres
- `GET /genre/tv/list` - TV show genres
- `GET /configuration` - API configuration

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style and structure
- Add proper error handling and loading states
- Ensure responsive design across all screen sizes
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDb)**: Providing comprehensive movie and TV data
- **React Community**: For the amazing ecosystem and tools
- **Tailwind CSS**: For the utility-first CSS framework
- **Open Source Contributors**: Making this project possible

## 🗺️ Roadmap

### Phase 1 ✅ (Completed)
- [x] Advanced search and filtering
- [x] TV series integration
- [x] Cast and crew information
- [x] User reviews and ratings
- [x] Dark/light mode toggle
- [x] Watchlist functionality
- [x] Responsive design optimization

### Phase 2 🚧 (In Development)
- [ ] User authentication and profiles
- [ ] Social features (sharing, comments)
- [ ] Advanced watchlist management
- [ ] Offline viewing capabilities
- [ ] Push notifications for new releases

### Phase 3 📋 (Planned)
- [ ] Multi-language support
- [ ] Advanced recommendation algorithms
- [ ] Integration with streaming services
- [ ] Mobile app development
- [ ] Voice search functionality

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure your TMDb API key is valid and has the correct permissions
- Check that the `.env` file is in the project root
- Restart the development server after adding the API key

**Images Not Loading**
- Verify the TMDb API configuration is working
- Check your internet connection
- Some images may be restricted by TMDb

**Search Not Working**
- Ensure the search query is at least 2 characters long
- Check the browser console for API errors
- Verify your API key has search permissions

**Dark Mode Not Working**
- Clear your browser cache and localStorage
- Check if your browser supports CSS custom properties
- Try toggling the theme manually

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/movie-app/issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable
4. Provide steps to reproduce the problem

## 📈 Performance

The app is optimized for performance with:
- Lazy loading of images and components
- Efficient API caching strategies
- Minimal bundle size through code splitting
- Responsive images for different screen sizes
- Skeleton loading states for better perceived performance
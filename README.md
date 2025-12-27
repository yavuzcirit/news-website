# News Website - Nuxt.js 3 SSR Application

A modern, SEO-friendly news website built with **Nuxt.js 3**, **TypeScript**, **Tailwind CSS v4**, and **Server-Side Rendering (SSR)**. This application fetches and displays news articles from the NewsData.io API with full SSR support, component-based architecture, and comprehensive logging.

## 🚀 Features

- **Full Server-Side Rendering (SSR)**: Complete SSR implementation with external navigation for optimal SEO
- **TypeScript**: Fully typed codebase with strict type checking
- **Tailwind CSS v4**: Modern utility-first CSS framework with `@theme` configuration
- **Component Architecture**: Modular, reusable components with code splitting
- **User Tracking**: Automatic user tracking with persistent cookies for analytics
- **Advanced Logging**: Detailed HTTP request/response logging with colored console output and user tracking
- **Fetcher Architecture**: Clean, reusable API service layer with comprehensive error handling
- **Pagination**: SSR-friendly pagination with session storage state management
- **Responsive Design**: Mobile-first, fully responsive UI with dark mode support
- **Dynamic Routing**: SEO-friendly URLs for individual news articles
- **Error Handling**: Robust error handling with user-friendly error messages and retry functionality
- **Environment Variables**: Secure API key management through .env files

## 📋 Prerequisites

- **Node.js** v18 or higher
- **yarn** or **npm** package manager
- **NewsData.io API key** ([Get one here](https://newsdata.io/))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-website
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your API credentials:
   ```env
   NUXT_PUBLIC_NEWS_API_KEY=your_api_key_here
   NUXT_PUBLIC_NEWS_API_BASE_URL=https://newsdata.io/api/1
   ```

## 🏃 Running the Application

### Development Mode

```bash
yarn dev
# or
npm run dev
```

The application will start at `http://localhost:3000`

**✨ Console Logging Features:**
- Open browser console (F12) to see detailed request/response logs
- Color-coded log levels (INFO in green, ERROR in red, WARN in yellow)
- HTTP request tracking with request IDs
- **User tracking IDs** - Each user gets a unique ID stored in cookies (1 year expiry)
- Response times and payload sizes
- Stack traces for errors
- Request/response grouping
- User session tracking with browser information

### Production Build

```bash
# Build the application
yarn build

# Preview the production build
yarn preview
```

### Type Checking

```bash
yarn typecheck
# or
npm run typecheck
```

### Testing

```bash
# Run tests in watch mode
yarn test
# or
npm test

# Run tests once
yarn test:run
# or
npm run test:run

# Run tests with UI
yarn test:ui
# or
npm run test:ui

# Run tests with coverage
yarn test:coverage
# or
npm run test:coverage
```

## 📁 Project Structure

```
news-website/
├── assets/
│   └── css/
│       ├── main.css              # Tailwind CSS v4 with @import and @theme
│       └── main.css.backup       # Original CSS backup
├── components/
│   ├── ArticleImage.vue          # Image component with fallback
│   ├── BackButton.vue            # Navigation back button
│   ├── ErrorMessage.vue          # Error display component
│   ├── LoadingSpinner.vue        # Loading state component
│   ├── NewsCard.vue              # News article card component
│   ├── PageHeader.vue            # Page header component
│   └── Pagination.vue            # Pagination controls
├── composables/
│   ├── useNewsApi.ts             # News API composable
│   ├── usePagination.ts          # Pagination state management
│   └── useUserTracking.ts        # User tracking with cookies
├── layouts/
│   └── default.vue               # Default layout with navbar/footer
├── pages/
│   ├── index.vue                 # News list page (homepage)
│   └── news/
│       └── [id].vue              # News detail page (dynamic route)
├── plugins/
│   └── userTracking.client.ts   # User tracking initialization plugin
├── services/
│   ├── fetcher.ts                # Generic HTTP fetcher with enhanced logging
│   └── newsApi.ts                # News API service
├── types/
│   ├── logger.ts                 # Logger type definitions
│   └── news.ts                   # News API type definitions
├── utils/
│   └── logger.ts                 # Advanced logging utility with user tracking
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Project dependencies
├── postcss.config.js             # PostCSS configuration (if needed)
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🏗️ Architecture

### Component-Based Architecture

The application uses a modular component architecture with code splitting:

- **7 Reusable Components**: Each component handles a single responsibility
- **Auto-imported**: Components are automatically imported by Nuxt
- **SSR-Compatible**: All components work with server-side rendering
- **Type-Safe**: Full TypeScript support with props validation

### Enhanced Logging System

The logger provides comprehensive tracking with the following features:

#### Features:
- **Color-Coded Output**: Different colors for each log level
- **HTTP Request Tracking**: Automatic request ID generation
- **User Tracking**: Each user gets a unique ID stored in cookies (1 year expiry)
- **Performance Monitoring**: Request duration tracking
- **Detailed Context**: Method, URL, status code, payload size, user ID
- **Stack Traces**: Full error stack traces in console
- **Environment-Aware**: Different behavior for dev/production
- **Session Tracking**: Browser info, language, screen resolution

#### User Tracking:
Every user visiting your site gets a unique tracking ID that persists for 1 year in cookies:
- Format: `user_1703710335180_abc123def456`
- Stored in cookie: `userTrackingId`
- Automatically included in all logs
- Visible in console with 👤 emoji
- Useful for tracking user journeys and debugging user-specific issues

#### Usage Example:
```typescript

const requestId = logger.httpRequest('GET', url, { params })

logger.httpResponse(requestId, 'GET', url, 200, duration, { dataSize })


logger.info('User action', { userId: 123, action: 'click' })
logger.error('Failed operation', error, { context: 'payment' })
```

#### Console Output Example:
```
[INFO] [2024-12-27T20:52:15.123Z] HTTP Request Started GET https://api.example.com 200 150ms [req_1234567890_1] 👤[user_1703710335180_abc123]
Context: { params: { page: 1 }, dataSize: 5432 }
```

### Fetcher Service

Enhanced fetcher with detailed logging:

- **Request/Response Logging**: Every HTTP call is logged with timing
- **Error Tracking**: Comprehensive error logging with stack traces
- **Timeout Handling**: Configurable timeouts with proper logging
- **Type Safety**: Full TypeScript support with generic types
- **URL Building**: Automatic query parameter handling

### State Management

- **Vue 3 Composables**: Reusable business logic
- **useState**: Nuxt's built-in SSR-friendly state
- **useCookie**: Persistent user tracking with cookies
- **Session Storage**: Client-side persistence for page numbers
- **Computed Properties**: Reactive derived state

### User Tracking System

Automatic user identification and tracking:

- **Unique User IDs**: Generated on first visit
- **Cookie Storage**: Persistent for 1 year
- **Privacy-Friendly**: No personal data collected
- **Automatic Logging**: Included in all console logs
- **Session Tracking**: Browser and device information

**Cookie Details:**
- Name: `userTrackingId`
- Format: `user_<timestamp>_<random>`
- Max Age: 365 days
- SameSite: Lax
- Secure: Production only
- Path: /

## 🎨 Design System

Built with Tailwind CSS v4:

- **Utility-First**: Fast development with utility classes
- **Dark Mode**: Built-in dark mode support
- **Responsive**: Mobile-first responsive design
- **Modern UI**: Card-based layout with smooth transitions
- **Accessible**: WCAG-compliant color contrast

## 🔑 API Integration

### NewsData.io API

**Get Latest News**
```
GET /latest?apikey={key}&size=10&page={page_token}
```

**Get News by ID**
```
GET /latest?apikey={key}&id={article_id}
```

## 📊 Monitoring & Debugging

### Console Logging

**Open browser console (F12) to track:**

1. **User Identification**
   - Unique user tracking ID displayed with 👤 emoji
   - Consistent across all sessions (1 year cookie)
   - Included in all HTTP requests and logs

2. **HTTP Requests**
   - Request start with method, URL, and request ID
   - Request completion with status code and duration
   - Response payload size
   - All parameters and context
   - User tracking ID for every request

3. **Errors**
   - Error messages with full stack traces
   - Request context (URL, method, params)
   - Error duration and timeout information
   - User tracking ID to identify affected users

4. **Performance**
   - Request timing (in milliseconds)
   - Slow request warnings (>1000ms)
   - Data transfer sizes

5. **User Sessions**
   - Session start with browser information
   - User agent and language
   - Screen resolution

### Example Console Output:

```bash
[INFO] [2024-12-27T20:52:15.180Z] User session started 👤[user_1703710335180_abc123def456]
Context: {
  "userAgent": "Mozilla/5.0...",
  "language": "en-US",
  "screenResolution": "1920x1080"
}

[INFO] [2024-12-27T20:52:15.180Z] HTTP Request Started GET https://newsdata.io/api/1/latest 200 234ms [req_1703710335180_1] 👤[user_1703710335180_abc123def456]
Context: {
  "params": {
    "apikey": "pub_***",
    "size": 10
  },
  "dataSize": 8432
}

[ERROR] [2024-12-27T20:52:16.234Z] HTTP Request Failed GET https://newsdata.io/api/1/latest 404 125ms [req_1703710336234_2] 👤[user_1703710335180_abc123def456]
Error: Article not found
Stack: Error: Article not found
    at handleResponse (fetcher.ts:67)
    ...
Context: {
  "method": "GET",
  "url": "https://newsdata.io/api/1/latest",
  "statusCode": 404
}
```

## 🧪 Technical Decisions

### Why Nuxt.js 3?
- Built-in SSR with automatic optimization
- File-based routing system
- Auto-import for components and composables
- Excellent TypeScript support
- Best-in-class developer experience

### Why Tailwind CSS v4?
- Faster builds with Lightning CSS
- CSS-first configuration with `@theme`
- Smaller bundle sizes
- Modern syntax

### Why Component Architecture?
- Code reusability across pages
- Better maintainability
- Automatic code splitting
- Easy testing
- Clear separation of concerns

### Why Enhanced Logging?
- Production-ready monitoring
- Easy debugging in development
- Performance tracking
- Error tracking and analysis
- Request tracing with IDs

## 🔒 Security Considerations

- API keys stored in environment variables
- `.env` file excluded from git
- No sensitive data in client-side code
- Input validation and sanitization
- Secure external link handling (noopener, noreferrer)
- XSS protection through Vue's template escaping

## ⚡ Performance Optimizations

- **Full SSR**: Server-side rendering for first paint
- **Code Splitting**: Automatic route-based splitting
- **Component Lazy Loading**: Load components as needed
- **Image Optimization**: Lazy loading with fallbacks
- **Compressed Assets**: Production build compression
- **Efficient Pagination**: API-level pagination
- **Tailwind CSS**: Purged unused styles in production

## 🐛 Error Handling

Comprehensive error handling for:

- Network failures (with retry option)
- API errors (4xx, 5xx with detailed logging)
- Timeout errors (configurable, logged)
- Invalid article IDs
- Missing data fields
- Image loading failures (fallback to placeholder)
- User-friendly error messages


## 🧪 Testing

The project includes comprehensive unit tests for components and composables using **Vitest** and **Vue Test Utils**.

### Quick Start

```bash
# Run tests in watch mode (development)
yarn test

# Run tests once (CI/CD)
yarn test:run

# Open visual test UI in browser
yarn test:ui

# Generate coverage report
yarn test:coverage
```

### Test Coverage

- ✅ **Components**: 6/7 tested (LoadingSpinner, ErrorMessage, BackButton, ArticleImage, Pagination, NewsCard)
- ✅ **Composables**: 2/3 tested (useUserTracking, useNewsApi)
- ✅ **Framework**: Vitest + Vue Test Utils + happy-dom
- ✅ **Total Tests**: 40+ test cases

### 📖 Detailed Testing Guide

For comprehensive testing
- 📁 Test structure and organization
- 🚀 Running tests (watch, CI, UI, coverage)
- ✍️ Writing new tests with examples
- ✨ Best practices and patterns
- 🐛 Troubleshooting guide
- 🔄 CI/CD integration examples

### Example Test

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders with custom message', () => {
    const wrapper = mount(LoadingSpinner, {
      props: { message: 'Loading articles...' }
    })
    
    expect(wrapper.text()).toContain('Loading articles...')
  })
})
```

### Test Files Location

```
components/__tests__/     - Component unit tests
composables/__tests__/    - Composable unit tests
vitest.config.ts         - Vitest configuration
coverage/                - Coverage reports (generated)
```

## 📝 Development Notes

### Important Files

- **`composables/useUserTracking.ts`**: User tracking with cookie management
- **`plugins/userTracking.client.ts`**: Initialize user tracking on app start
- **`utils/logger.ts`**: Enhanced logger with HTTP tracking and user ID
- **`services/fetcher.ts`**: HTTP client with comprehensive logging
- **`composables/usePagination.ts`**: Pagination state with session storage
- **`nuxt.config.ts`**: Nuxt and PostCSS configuration
- **`tailwind.config.js`**: Tailwind CSS v4 configuration

### Logging Best Practices

1. Always use the logger for HTTP requests
2. Include request IDs for tracing
3. Log performance metrics for optimization
4. Include relevant context in logs
5. Use appropriate log levels

## 📄 License

This project is created as a technical case study.

## 🤝 Contributing

For improvements or suggestions:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

**For debugging:**
- Open browser console (F12)
- Check colored log output with user tracking IDs 👤
- Look for request IDs to trace requests
- Review error stack traces
- Check your user tracking ID in cookies (Application tab → Cookies → userTrackingId)

For questions or issues, please create an issue in the repository.

---

**Built using Nuxt.js 3, TypeScript, Tailwind CSS v4, and modern web technologies**

**🎯 Key Highlights:**
- ✅ Full SSR with external navigation
- ✅ Component-based architecture
- ✅ Advanced logging with HTTP tracking
- ✅ **User tracking with persistent cookies**
- ✅ Tailwind CSS v4
- ✅ Production-ready error handling
- ✅ Comprehensive TypeScript types
- ✅ Privacy-friendly analytics

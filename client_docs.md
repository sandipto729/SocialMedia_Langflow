# Social Media Analytics Platform - Frontend Documentation

## Table of Contents
- [Overview](#overview)
- [Pages](#pages)
  - [Landing Page](#landing-page)
  - [Analytics Dashboard](#analytics-dashboard)
- [Components](#components)
- [Data Integration](#data-integration)
- [Technical Specifications](#technical-specifications)
- [Implementation Notes](#implementation-notes)

## Overview

A React-based web application for social media analytics using DataStax Astra DB and Langflow integration. The frontend provides intuitive visualization and analysis of social media engagement metrics.

## Pages

### Landing Page

#### Purpose
* Entry point for the application
* Showcase project capabilities
* Display team information
* Navigation to analytics dashboard

#### Key Components

##### Header Section
* Navigation bar with logo and menu items
* Hero section with engaging headline
* Call-to-action button
* Brief project description

##### Features Section
* Card-based layout highlighting functionalities:
  * Real-time social media analytics
  * GPT-powered insights
  * Custom metric tracking
  * Data visualization

##### Team Section
* Team member cards containing:
  * Profile pictures
  * Names and roles
  * Brief descriptions
  * Professional profile links (optional)

##### Footer
* Quick links
* Contact information
* Hackathon information

### Analytics Dashboard

#### Purpose
* Visualize social media engagement metrics
* Analyze post performance across content types
* Enable data-driven content strategy decisions

#### Key Components

##### Dashboard Header
* Date range selector
* Post type filter (Reel, Carousel, Static Image)
* Refresh data controls
* Export options (CSV/JSON)

##### Performance Overview Cards

###### Post Distribution Card
* Breakdown of post types
* Total post counts by type
* Visual representation (pie/donut chart)

###### Engagement Summary Card
* Total likes, shares, and comments
* Average engagement rates by post type
* Trend indicators

##### Data Visualization Section

###### Post Performance Chart
```typescript
interface ChartConfig {
  xAxis: string;  // Date_Posted
  yAxis: string;  // Engagement metrics
  series: {
    type: string;
    data: number[];
  }[];
}
```

Features:
* Line/bar chart visualization
* Toggle between metrics
* Hover tooltips
* Color-coded by Post_Type

###### Post Type Comparison
* Bar chart comparing metrics
* Separate bars for engagement types
* Visual hierarchy for performance

##### Data Grid
* Sortable and filterable table
* Columns:
  * Post_ID
  * Post_Type
  * Date_Posted
  * Likes
  * Shares
  * Comments
  * Engagement Rate
* Search functionality
* Pagination (50 items per page)

##### Analytics Insights Panel
* GPT-generated insights:
  * Performance Patterns
  * Top-performing post types
  * Engagement rate trends
  * Best posting times/dates
  * Strategic Recommendations

## Data Integration

### Dataset Structure
```typescript
interface PostData {
  Post_ID: string;
  Post_Type: 'Reel' | 'Carousel' | 'Static Image';
  Likes: number;
  Shares: number;
  Comments: number;
  Date_Posted: string;
}

interface EngagementMetrics {
  totalEngagement: number;  // likes + shares + comments
  engagementRate: number;   // totalEngagement / average engagement for post type
  performanceScore: number; // weighted score based on engagement metrics
}
```

### State Management
```typescript
interface DashboardState {
  posts: PostData[];
  dateRange: [Date, Date];
  selectedPostTypes: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  filters: {
    search: string;
    minEngagement?: number;
    maxEngagement?: number;
  };
}
```

### API Integration
* Endpoint: `/api/posts`
* Query Parameters:
  * startDate: ISO date string
  * endDate: ISO date string
  * postTypes: Array of post types
  * page: Page number
  * limit: Items per page
  * sort: Sort field
  * order: Sort order

## Technical Specifications

### State Management
* Redux or Context API for global state
* Local state for component-specific data

### Design Guidelines

#### Color Palette
* Primary: `#2563EB` (Blue)
* Secondary: `#3B82F6` (Light Blue)
* Accent: `#EAB308` (Yellow)
* Background: `#F8FAFC` (Light Gray)
* Text: `#1E293B` (Dark Gray)

#### Typography
* Headings: Inter
* Body: Roboto
* Monospace: Source Code Pro

#### Component Styling
* Padding: `1rem` (16px)
* Border radius: `0.5rem` (8px)
* Shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
* Transitions: 150ms ease-in-out

### Responsive Design
* Breakpoints:
  * Mobile: 320px - 480px
  * Tablet: 481px - 768px
  * Desktop: 769px+
* Mobile view: Stack cards and charts vertically
* Tablet view: 2-column grid for cards
* Desktop view: Full dashboard layout with sidebars

## Implementation Notes

### Performance Optimizations
* Implement lazy loading for dashboard components
* Use virtualization for large data grids
* Cache API responses
* Optimize images and assets

### Security
* Implement authentication if required
* Sanitize data inputs
* Secure API endpoints

### Accessibility
* ARIA labels
* Keyboard navigation
* Color contrast compliance
* Screen reader compatibility

### Testing Strategy
* Unit tests for components
* Integration tests for API calls
* End-to-end testing for critical paths
* Performance testing for data-heavy operations

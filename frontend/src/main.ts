import { Router } from '@vaadin/router';
import './app';
import './styles/global.css';

// Initialize router
const outlet = document.getElementById('app');
const router = new Router(outlet);

// Define routes
router.setRoutes([
  {
    path: '/',
    component: 'app-root',
    children: [
      { path: '/', component: 'home-page' },
      { path: '/explore', component: 'explore-page' },
      { path: '/content/:id', component: 'content-detail-page' },
      { path: '/category/:type', component: 'category-page' },
      { path: '/search', component: 'search-results-page' },
      { path: '/trending', component: 'trending-page' },
      { path: '/profile', component: 'profile-page' },
      { path: '/watchlist', component: 'watchlist-page' },
      { path: '/login', component: 'login-page' },
      { path: '/register', component: 'register-page' },
      { path: '/admin', component: 'admin-page' },
      { path: '(.*)', component: 'not-found-page' },
    ],
  },
]);

// Log app initialization
console.log('🎬 EntertainingHub Pro - Frontend Initialized');

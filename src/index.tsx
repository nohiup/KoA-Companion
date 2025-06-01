/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Import Page Components
import { OverviewPage } from './pages/OverviewPage';
import { ClassesPage } from './pages/ClassesPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { TraitsPage } from './pages/TraitsPage';
import HousesList from './pages/RacesPage';

// --- Page Keys ---
export type PageKey = 'overview' | 'classes' | 'equipment' | 'traits' | 'races';

// --- SVG Icons (Exported for use in other modules if needed) ---
export const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L9.91 8.09L3 10.18L8.09 15.27L7.06 22L12 18.27L16.94 22L15.91 15.27L21 10.18L14.09 8.09L12 2Z" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export const ListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

export const HammerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 2.5L21.5 8.5L12.5 17.5L6.5 11.5L15.5 2.5Z"></path>
    <path d="M5 14L2 17L7 22L10 19"></path>
    <path d="M15 2.5L9.5 8L2.5 15"></path>
  </svg>
);

// --- General Components ---
interface HeaderProps {
  currentPage: PageKey;
  navigateTo: (page: PageKey) => void;
}

function Header({ currentPage, navigateTo }: HeaderProps) {
  const navItems: { key: PageKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'classes', label: 'Classes' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'traits', label: 'Traits' },
    { key: 'races', label: 'Races' },
  ];

  return (
    <header className="app-header">
      <div className="logo" onClick={() => navigateTo('overview')} style={{ cursor: 'pointer' }}>
        <SparkleIcon />
        <h1>Knights of Ages</h1>
      </div>
      <div className="header-right-content">
        <nav>
          {navItems.map(item => (
            <a
              key={item.key}
              href="#"
              onClick={(e) => { e.preventDefault(); navigateTo(item.key); }}
              className={currentPage === item.key ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="user-actions">
          <button aria-label="Search" className="icon-button"><SearchIcon /></button>
          <button aria-label="Profile" className="icon-button"><UserIcon /></button>
          <img 
            src="https://via.placeholder.com/40/E0E0E0/333333?Text=User" 
            alt="User Avatar" 
            className="avatar" 
          />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Knights of Ages. All rights reserved.</p>
    </footer>
  );
}

// --- Main App Component ---
function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('overview');

  const navigateTo = (page: PageKey) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage navigateTo={navigateTo} />;
      case 'classes':
        return <ClassesPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'traits':
        return <TraitsPage />;
      case 'races':
        return <HousesList />;
      default:
        return <OverviewPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  ); 
} export default App;
 
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Failed to find the root element');
}
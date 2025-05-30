/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { PageKey } from '../index'; // Adjust path as necessary
import { SearchIcon, ListIcon, HammerIcon } from '../index'; // Adjust path as necessary

// --- Overview Page Components ---
function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-content">
        <h2 id="hero-title">Welcome to Knights of Ages</h2>
        <p>
          Explore the world of Knights of Ages, a strategy RPG where you command a squad of heroes in tactical
          battles. Discover the lore, classes, and strategies to conquer your foes.
        </p>
        <button className="play-now-button">Play Now</button>
      </div>
    </section>
  );
}

function GameOverview() {
  return (
    <section className="content-section game-overview" aria-labelledby="game-overview-title">
      <h3 id="game-overview-title">Game Overview</h3>
      <p>
        Knights of Ages is a turn-based strategy RPG set in a medieval fantasy world. Players assemble a team of heroes, each
        with unique classes and traits, to engage in tactical battles. The game features a deep storyline, challenging missions,
        and a unique Heirloom Tool for customizing your heroes.
      </p>
    </section>
  );
}

function LatestNews() {
  return (
    <section className="content-section latest-news" aria-labelledby="latest-news-title">
      <div className="news-text-content">
        <h3 id="latest-news-title">Latest News</h3>
        <span className="news-tag">Update</span>
        <h4>New Patch 1.2 Released</h4>
        <p>
          Patch 1.2 introduces new heroes, missions, and balance changes. Read the full patch
          notes for more details.
        </p>
      </div>
      <div className="news-image-container">
        <img
          src="https://via.placeholder.com/400x250/556B2F/FFFFFF?Text=Patch+1.2+Image"
          alt="Knights in a forest, Patch 1.2 update visual"
          className="news-image"
        />
      </div>
    </section>
  );
}

interface QuickLinksProps {
  navigateTo: (page: PageKey) => void;
}

function QuickLinks({ navigateTo }: QuickLinksProps) {
  const links = [
    { id: 'classes' as PageKey, title: 'Classes', Icon: SearchIcon /* MagnifyingGlassIcon was SearchIcon */ },
    { id: 'traits' as PageKey, title: 'Traits', Icon: ListIcon },
    { id: 'heirloomTool' as PageKey, title: 'Heirloom Tool', Icon: HammerIcon },
  ];

  return (
    <section className="content-section quick-links" aria-labelledby="quick-links-title">
      <h3 id="quick-links-title">Quick Links</h3>
      <div className="quick-links-container">
        {links.map(link => (
          <a
            key={link.id}
            href="#"
            onClick={(e) => { e.preventDefault(); navigateTo(link.id);}}
            className="quick-link-card"
            aria-label={`Link to ${link.title}`}
          >
            <link.Icon />
            <span>{link.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function OverviewPage({ navigateTo }: QuickLinksProps) {
  return (
    <>
      <Hero />
      <GameOverview />
      <LatestNews />
      <QuickLinks navigateTo={navigateTo} />
    </>
  );
}

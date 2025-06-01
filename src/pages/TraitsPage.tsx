/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState } from 'react';
import { SearchIcon } from '../index'; // Assuming SearchIcon is exported from index.tsx

// --- SVG Icons for Filters ---
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

// --- Data for Traits ---
interface Trait {
  id: string;
  name: string;
  description: string;
  type: 'Passive' | 'Active';
  iconUrl: string;
  iconAlt: string;
}

const traitsData: Trait[] = [
  {
    id: 'strategic-mind',
    name: 'Strategic Mind',
    description: 'Increases tactical awareness and decision-making speed in battle.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/008080/FFFFFF?Text=SM', // Teal background
    iconAlt: 'Strategic Mind Icon - Brain symbol',
  },
  {
    id: 'swift-strike',
    name: 'Swift Strike',
    description: 'Enhances attack speed and agility, allowing for quicker turns.',
    type: 'Active',
    iconUrl: 'https://via.placeholder.com/40/ADD8E6/333333?Text=SS', // Light blue background
    iconAlt: 'Swift Strike Icon - Winged foot symbol',
  },
  {
    id: 'resilient-defense',
    name: 'Resilient Defense',
    description: 'Boosts defense and resistance to damage, making the character more durable.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/2F4F4F/FFFFFF?Text=RD', // Dark slate gray / Dark teal
    iconAlt: 'Resilient Defense Icon - Shield symbol',
  },
  {
    id: 'arcane-mastery',
    name: 'Arcane Mastery',
    description: 'Increases magical power and reduces mana costs for spells.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/00008B/FFFFFF?Text=AM', // Dark blue background
    iconAlt: 'Arcane Mastery Icon - Abstract magic symbol',
  },
  {
    id: 'stealth-expertise',
    name: 'Stealth Expertise',
    description: 'Improves stealth capabilities and evasion, making the character harder to detect.',
    type: 'Active',
    iconUrl: 'https://via.placeholder.com/40/B0E0E6/333333?Text=SE', // Powder blue background
    iconAlt: 'Stealth Expertise Icon - Masked person symbol',
  },
  {
    id: 'divine-blessing',
    name: 'Divine Blessing',
    description: 'Provides healing bonuses and protection against negative effects.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/40E0D0/333333?Text=DB', // Turquoise background
    iconAlt: 'Divine Blessing Icon - Saintly figure symbol',
  },
  {
    id: 'feral-instinct',
    name: 'Feral Instinct',
    description: 'Enhances critical hit chance and damage, unleashing powerful attacks.',
    type: 'Active',
    iconUrl: 'https://via.placeholder.com/40/008080/FFFFFF?Text=FI', // Teal background
    iconAlt: 'Feral Instinct Icon - Claw mark symbol',
  },
  {
    id: 'precise-aim',
    name: 'Precise Aim',
    description: 'Increases accuracy and range for ranged attacks.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/F0F8FF/333333?Text=PA', // Alice blue (very light)
    iconAlt: 'Precise Aim Icon - Target symbol',
  },
  {
    id: 'shadow-veil',
    name: 'Shadow Veil',
    description: 'Allows the character to temporarily become invisible, avoiding enemy attacks.',
    type: 'Active',
    iconUrl: 'https://via.placeholder.com/40/98FB98/333333?Text=SV', // Pale green background
    iconAlt: 'Shadow Veil Icon - Leaf symbol',
  },
  {
    id: 'elemental-affinity',
    name: 'Elemental Affinity',
    description: 'Grants resistance to a specific element (fire, water, earth, air) and enhances related abilities.',
    type: 'Passive',
    iconUrl: 'https://via.placeholder.com/40/AFEEEE/333333?Text=EA', // Pale turquoise background
    iconAlt: 'Elemental Affinity Icon - Mortar and pestle symbol',
  },
];


export function TraitsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filtering logic would go here if functionality was required
  const filteredTraits = traitsData.filter(trait =>
    trait.name.toLowerCase().includes(searchTerm.toLowerCase())
    // Add rarity and category filters when data supports it
  );

  return (
    <div className="traits-page-container content-section">
      <header className="traits-header">
        <h1 id="traits-title">Traits</h1>
        <p>
          Explore the unique traits that define your characters in Knights of Ages. Each trait offers distinct advantages and synergies,
          influencing combat effectiveness and strategic depth. Use the search bar and filters to find the perfect traits to enhance
          your team's capabilities.
        </p>
      </header>

      <section className="traits-controls" aria-labelledby="filter-controls-label">
        <h2 id="filter-controls-label" className="visually-hidden">Filter Controls</h2>
        <div className="search-input-container">
          <SearchIcon />
          <input
            type="search"
            id="search-traits"
            placeholder="Search traits"
            aria-label="Search traits"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="traits-search-input"
          />
        </div>
        <div className="filter-dropdown-container">
          <label htmlFor="rarity-filter" className="visually-hidden">Filter by Rarity</label>
          <select
            id="rarity-filter"
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="traits-filter-select"
            aria-label="Filter by Rarity"
          >
            <option value="all">Rarity</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
          <ChevronDownIcon />
        </div>
        <div className="filter-dropdown-container">
          <label htmlFor="category-filter" className="visually-hidden">Filter by Category</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="traits-filter-select"
            aria-label="Filter by Category"
          >
            <option value="all">Category</option>
            <option value="offensive">Offensive</option>
            <option value="defensive">Defensive</option>
            <option value="utility">Utility</option>
            <option value="class-specific">Class Specific</option>
          </select>
          <ChevronDownIcon />
        </div>
      </section>

      <div className="traits-table-container" role="region" aria-labelledby="traits-table-caption">
        <table className="traits-table">
          <caption id="traits-table-caption" className="visually-hidden">Table of Character Traits</caption>
          <thead>
            <tr>
              <th scope="col">Trait Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Icon</th>
            </tr>
          </thead>
          <tbody>
            {filteredTraits.map((trait) => (
              <tr key={trait.id}>
                <td data-label="Trait Name">{trait.name}</td>
                <td data-label="Description">{trait.description}</td>
                <td data-label="Type">{trait.type}</td>
                <td data-label="Icon" className="trait-icon-cell">
                  <img src={trait.iconUrl} alt={trait.iconAlt} className="trait-icon" />
                </td>
              </tr>
            ))}
            {filteredTraits.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>No traits found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState, createContext, useContext, useMemo } from 'react';
// --- Data Structures ---
interface FacialTraitPreview {
  id: string;
  imageUrl: string;
  altText: string;
}

interface FacialTraitCategory {
  id: string;
  name: string;
  previews: FacialTraitPreview[];
}

interface HouseData {
  id: string;
  name: string;
  sidebarIconUrl: string;
  sidebarIconAlt: string;
  description: string;
  bannerImageUrl: string;
  bannerImageAlt: string;
  facialTraits: FacialTraitCategory[];
  clothDescription: string;
}

type HouseTabKey = 'facialTraits' | 'quests' | 'fort' | 'resource';

// --- Mock Data ---
// const housesData: HouseData[] = [
//   {
//     id: 'thorne',
//     name: 'House Thorne',
//     sidebarIconUrl: 'https://via.placeholder.com/40/3A5E8A/FFFFFF?Text=T', // Dark blueish
//     sidebarIconAlt: 'House Thorne Sigil',
//     description: 'Explore the divine races of Galtian, each distinguished by its heraldic banner, unique history, and defining traits. House Thorne is known for its strategic prowess and resilience.',
//     bannerImageUrl: 'https://storage.googleapis.com/screenshots.jpeg/gemini-pro-vision/KnightsOfAges/koa_houses_banner_thorne.png', // Placeholder for detailed banner
//     bannerImageAlt: 'Banner of House Thorne',
//     facialTraits: [
//       { id: 'gender', name: 'Gender', previews: [{id: 'g1', imageUrl: 'https://via.placeholder.com/60/708090/FFFFFF?Text=M', altText: 'Male'}, {id: 'g2', imageUrl: 'https://via.placeholder.com/60/778899/FFFFFF?Text=F', altText: 'Female'}] },
//       { id: 'nose', name: 'Nose', previews: [{id: 'n1', imageUrl: 'https://via.placeholder.com/60/A9A9A9/333333?Text=N1', altText: 'Nose type 1'}, {id: 'n2', imageUrl: 'https://via.placeholder.com/60/C0C0C0/333333?Text=N2', altText: 'Nose type 2'}] },
//       { id: 'eyebrows', name: 'Eyebrows', previews: [{id: 'e1', imageUrl: 'https://via.placeholder.com/60/D3D3D3/333333?Text=E1', altText: 'Eyebrow type 1'}, {id: 'e2', imageUrl: 'https://via.placeholder.com/60/DCDCDC/333333?Text=E2', altText: 'Eyebrow type 2'}] },
//       { id: 'tattoo', name: 'Tattoo', previews: [{id: 't1', imageUrl: 'https://via.placeholder.com/60/696969/FFFFFF?Text=T1', altText: 'Tattoo type 1'}, {id: 't2', imageUrl: 'https://via.placeholder.com/60/808080/FFFFFF?Text=T2', altText: 'Tattoo type 2'}] },
//       { id: 'hair', name: 'Hair', previews: [{id: 'h1', imageUrl: 'https://via.placeholder.com/60/BEBEBE/333333?Text=H1', altText: 'Hair type 1'}, {id: 'h2', imageUrl: 'https://via.placeholder.com/60/E6E6FA/333333?Text=H2', altText: 'Hair type 2'}] },
//       { id: 'name', name: 'Name', previews: [{id: 'na1', imageUrl: 'https://via.placeholder.com/60/B0C4DE/333333?Text=A', altText: 'Name style A'}, {id: 'na2', imageUrl: 'https://via.placeholder.com/60/ADD8E6/333333?Text=B', altText: 'Name style B'}] }, // Placeholder for name/face shape
//       { id: 'eyes', name: 'Eyes', previews: [{id: 'ey1', imageUrl: 'https://via.placeholder.com/60/BDB76B/333333?Text=E1', altText: 'Eye type 1'}, {id: 'ey2', imageUrl: 'https://via.placeholder.com/60/F0E68C/333333?Text=E2', altText: 'Eye type 2'}] },
//       { id: 'face', name: 'Face', previews: [{id: 'f1', imageUrl: 'https://via.placeholder.com/60/D2B48C/333333?Text=F1', altText: 'Face type 1'}, {id: 'f2', imageUrl: 'https://via.placeholder.com/60/BC8F8F/333333?Text=F2', altText: 'Face type 2'}] },
//       { id: 'lip', name: 'Lip', previews: [{id: 'l1', imageUrl: 'https://via.placeholder.com/60/F4A460/333333?Text=L1', altText: 'Lip type 1'}, {id: 'l2', imageUrl: 'https://via.placeholder.com/60/CD853F/333333?Text=L2', altText: 'Lip type 2'}] },
//       { id: 'ear', name: 'Ear', previews: [{id: 'ea1', imageUrl: 'https://via.placeholder.com/60/DEB887/333333?Text=E1', altText: 'Ear type 1'}, {id: 'ea2', imageUrl: 'https://via.placeholder.com/60/FFE4B5/333333?Text=E2', altText: 'Ear type 2'}] },
//     ],
//     clothDescription: 'House Thorne\'s attire is typically practical and sturdy, reflecting their focus on defense and strategy. Expect to see leather armor, dark colors, and minimal ornamentation.',
//     raceDescription: 'The members of House Thorne are predominantly of the Northern Galtian race, known for their resilience and strategic minds. Their physical traits often include strong builds and sharp features.',
//   },
//   {
//     id: 'sunhaven',
//     name: 'House Sunhaven',
//     sidebarIconUrl: 'https://via.placeholder.com/40/FFD700/333333?Text=S', // Gold/Yellow
//     sidebarIconAlt: 'House Sunhaven Sigil',
//     description: 'House Sunhaven is renowned for its radiant knights and unwavering faith. They are a beacon of hope and justice in Galtian.',
//     bannerImageUrl: 'https://via.placeholder.com/860x360/4A3B25/FFFFFF?Text=Sunhaven+Banner',
//     bannerImageAlt: 'Banner of House Sunhaven',
//     facialTraits: [ /* Simplified for brevity, copy structure from Thorne if needed */
//       { id: 'gender', name: 'Gender', previews: [{id: 'g1', imageUrl: 'https://via.placeholder.com/60/708090/FFFFFF?Text=M', altText: 'Male'}, {id: 'g2', imageUrl: 'https://via.placeholder.com/60/778899/FFFFFF?Text=F', altText: 'Female'}] },
//     ],
//     clothDescription: 'Sunhaven attire is often adorned with symbols of the sun, featuring bright, hopeful colors mixed with practical armor.',
//     raceDescription: 'Sunhaven members are diverse, but many hail from the central plains, known for their optimistic spirit.',
//   },
//   {
//     id: 'greenleaf',
//     name: 'House Greenleaf',
//     sidebarIconUrl: 'https://via.placeholder.com/40/228B22/FFFFFF?Text=G', // Forest Green
//     sidebarIconAlt: 'House Greenleaf Sigil',
//     description: 'Keepers of ancient forests and skilled archers, House Greenleaf values nature and precision.',
//     bannerImageUrl: 'https://via.placeholder.com/860x360/2E3B2E/FFFFFF?Text=Greenleaf+Banner',
//     bannerImageAlt: 'Banner of House Greenleaf',
//     facialTraits: [],
//     clothDescription: 'Greenleaf attire incorporates natural materials and camouflaging colors, practical for woodland operations.',
//     raceDescription: 'Many Greenleaf members have elven heritage, granting them keen senses and agility.',
//   },
//   {
//     id: 'wavecrest',
//     name: 'House Wavecrest',
//     sidebarIconUrl: 'https://via.placeholder.com/40/4682B4/FFFFFF?Text=W', // Steel Blue
//     sidebarIconAlt: 'House Wavecrest Sigil',
//     description: 'Masters of naval warfare and coastal territories, House Wavecrest are formidable at sea.',
//     bannerImageUrl: 'https://via.placeholder.com/860x360/2A3B4C/FFFFFF?Text=Wavecrest+Banner',
//     bannerImageAlt: 'Banner of House Wavecrest',
//     facialTraits: [],
//     clothDescription: 'Wavecrest attire is designed for seafaring, often made of durable, water-resistant materials.',
//     raceDescription: 'Coastal folk, accustomed to the sea, form the core of House Wavecrest.',
//   },
//   {
//     id: 'emberfell',
//     name: 'House Emberfell',
//     sidebarIconUrl: 'https://via.placeholder.com/40/A0522D/FFFFFF?Text=E', // Sienna / Brownish-Red
//     sidebarIconAlt: 'House Emberfell Sigil',
//     description: 'Hailing from volcanic lands, House Emberfell are known for their fiery temper and smithing skills.',
//     bannerImageUrl: 'https://via.placeholder.com/860x360/4A2E25/FFFFFF?Text=Emberfell+Banner',
//     bannerImageAlt: 'Banner of House Emberfell',
//     facialTraits: [],
//     clothDescription: 'Emberfell attire often incorporates volcanic rock and metals, with designs inspired by fire and earth.',
//     raceDescription: 'The people of Emberfell are hardy, adapted to harsh, volcanic environments.',
//   },
// ];

//URL:
const allHousesUrl = 'http://localhost:8080/races/all';

//Real api call data
const HousesList: React.FC = () => {
  console.log('HousesList component initialized');
  const [housesData, setHouses] = useState<HouseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching houses data from:', allHousesUrl);
    
     const fetchHouses = async () => {
    try {
      const response = await fetch(allHousesUrl);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();

            // Xử lý dữ liệu rawData thành dạng HouseData[]
      const processedData: HouseData[] = data.map((item: any) => ({
        id: item.id,              // ví dụ đổi tên trường
        name: item.name,
        sidebarIconUrl: item.flagUrl,
        sidebarIconAlt: item.name,
        description: item.description,
        bannerImageUrl: item.maxAttUrl,
        bannerImageAlt: "Max attribute to achieve of " + item.name,
        facialTraits: null, // Giả sử không có dữ liệu facialTraits trong rawData
        clothDescription: item.clothingUrl     
      }));

      setHouses(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  fetchHouses();
}, []);


  if (loading) return <div>Loading houses...</div>;
  if (error) return <div>Error: {error}</div>;

      return <RacesPage housesData={housesData} />;
};
export default HousesList;


// --- Components ---

const FacialTraitsTabContent: React.FC<{ traits: FacialTraitCategory[] }> = ({ traits }) => {
  if (!traits || traits.length === 0) {
    return <p>Facial trait information is not available for this race.</p>;
  }
  return (
    <div className="facial-traits-content">
      {traits.map(category => (
        <div key={category.id} className="facial-trait-category">
          <h4 className="facial-trait-category-name">{category.name}</h4>
          <div className="facial-trait-previews">
            {category.previews.map(preview => (
              <img key={preview.id} src={preview.imageUrl} alt={preview.altText} className="facial-trait-preview-icon" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 

const PlaceholderTabContent: React.FC<{ tabName: string }> = ({ tabName }) => (
  <div className="placeholder-tab-content">
    <p>Content for {tabName} will be available soon. Check back later!</p>
    <img src={`https://via.placeholder.com/400x200/282629/A9A9A9?Text=${tabName}+Details`} alt={`${tabName} Placeholder`} />
  </div>
);

type RacesPageProps = {
  housesData: HouseData[];
};

export function RacesPage({ housesData }: RacesPageProps) {
  const [selectedHouseId, setSelectedHouseId] = useState<string>(housesData[0].id);
  const [activeTab, setActiveTab] = useState<HouseTabKey>('facialTraits');

  const selectedHouse = housesData.find(h => h.id === selectedHouseId) || housesData[0];

  const houseTabs: { key: HouseTabKey; label: string }[] = [
    { key: 'facialTraits', label: 'Facial Traits' },
    { key: 'quests', label: 'Quests' },
    { key: 'fort', label: 'Fort' },
    { key: 'resource', label: 'Resource' },
  ];

  return (
    <div className="houses-page-container">
      <aside className="houses-sidebar">
        <h2 className="divine-houses-title">Divine Races</h2>
        <nav aria-label="Select a House">
          <ul className="house-list">
            {housesData.map(house => (
              <li key={house.id} className={`house-list-item ${house.id === selectedHouseId ? 'active' : ''}`}>
                <button onClick={() => { setSelectedHouseId(house.id); setActiveTab('facialTraits'); }} aria-current={house.id === selectedHouseId ? "page" : undefined}>
                  <img src={house.sidebarIconUrl} alt={house.sidebarIconAlt} className="house-sidebar-icon" />
                  <span>{house.name}</span>
                  {house.id === selectedHouseId && <div className="active-indicator" aria-hidden="true"></div>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="house-content-area" aria-live="polite" aria-atomic="true">
        <section className="house-header-details" aria-labelledby={`house-title-${selectedHouse.id}`}>
          <h1 id={`house-title-${selectedHouse.id}`} className="house-main-title">{selectedHouse.name}</h1>
          <p className="house-main-description">{selectedHouse.description}</p>
        </section>

        <section className="house-banner" aria-label={`${selectedHouse.name} Banner`}>
          <img src={selectedHouse.bannerImageUrl} alt={selectedHouse.bannerImageAlt} className="house-banner-image" />
           <img src={selectedHouse.clothDescription} alt={`Cloth of ${selectedHouse.name}`} className="house-banner-image" />
        </section>

        <nav className="house-tabs" aria-label="House Details Tabs">
          {houseTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls={`tab-panel-${tab.key}`}
              id={`tab-button-${tab.key}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="tab-content-container">
          {activeTab === 'facialTraits' && (
            <section id="tab-panel-facialTraits" role="tabpanel" aria-labelledby="tab-button-facialTraits">
              <FacialTraitsTabContent traits={selectedHouse.facialTraits} />
            </section>
          )}
          {activeTab === 'quests' && (
            <section id="tab-panel-quests" role="tabpanel" aria-labelledby="tab-button-quests">
              <PlaceholderTabContent tabName="Quests" />
            </section>
          )}
          {activeTab === 'fort' && (
            <section id="tab-panel-fort" role="tabpanel" aria-labelledby="tab-button-fort">
               <PlaceholderTabContent tabName="Fort" />
            </section>
          )}
          {activeTab === 'resource' && (
            <section id="tab-panel-resource" role="tabpanel" aria-labelledby="tab-button-resource">
              <PlaceholderTabContent tabName="Resource" />
            </section>
          )}
        </div>

        <section className="house-additional-info" aria-labelledby="additional-info-title">
           <h3 id="additional-info-title" className="visually-hidden">Additional House Information</h3>
           <div className="info-block">
            <h4>Cloth</h4>
            <img 
            src={selectedHouse.clothDescription} 
            alt={`Cloth image of ${selectedHouse.name}`} 
            className="cloth-image" />
           </div>
           <div className="info-block">
            <h4>Race</h4>
            <p>{selectedHouse.description}</p>
           </div>
        </section>

      </main>
    </div>
  );
}

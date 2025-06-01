/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Data for Classes ---
const classesData = [
  {
    name: 'Warrior',
    tagline: 'The stalwart Warrior, a master of melee combat.',
    description: 'Warriors are the frontline fighters, skilled in wielding swords, axes, and shields. They excel in close-quarters combat and can withstand heavy damage.',
    imageUrl: 'https://storage.googleapis.com/pai-images/e408344091954aa1ae15824409796e36.jpeg',
    altText: 'Artwork of a Knight of Ages Warrior character'
  },
  {
    name: 'Mage',
    tagline: 'The enigmatic Mage, wielder of arcane arts.',
    description: 'Mages harness the power of magic, casting spells to damage enemies, heal allies, and control the battlefield. They are versatile spellcasters with a wide range of abilities.',
    imageUrl: 'https://storage.googleapis.com/pai-images/0f208944e0a144ce8c9a9e3644c481f0.jpeg',
    altText: 'Artwork of a Knight of Ages Mage character'
  },
  {
    name: 'Rogue',
    tagline: 'The elusive Rogue, a master of stealth and subterfuge.',
    description: 'Rogues are agile and cunning, specializing in stealth, traps, and ranged attacks. They can deal high damage from a distance or strike from the shadows.',
    imageUrl: 'https://storage.googleapis.com/pai-images/d2095c798447456db6d99125b7d0c3ad.jpeg',
    altText: 'Artwork of a Knight of Ages Rogue character'
  },
  {
    name: 'Cleric',
    tagline: 'The benevolent Cleric, a beacon of healing and support.',
    description: 'Clerics are the healers and supporters of the group, using divine magic to mend wounds, buff allies, and protect against harm. They are essential for keeping the party alive.',
    imageUrl: 'https://storage.googleapis.com/pai-images/58391583354c4fa4a798462ae3b7e121.jpeg',
    altText: 'Artwork of a Knight of Ages Cleric character'
  }
];

// --- Classes Page Components ---
interface CharacterClassCardProps {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  altText: string;
}

function CharacterClassCard({ name, tagline, description, imageUrl, altText }: CharacterClassCardProps) {
  return (
    <article className="class-card" aria-labelledby={`class-title-${name.toLowerCase()}`}>
      <div className="class-card-text-content">
        <h2 id={`class-title-${name.toLowerCase()}`} className="class-name">{name}</h2>
        <p className="class-tagline">{tagline}</p>
        <p className="class-description">{description}</p>
        <button className="learn-more-button">Learn More</button>
      </div>
      <div className="class-card-image-container">
        <img src={imageUrl} alt={altText} className="class-image" />
      </div>
    </article>
  );
}

export function ClassesPage() {
  return (
    <div className="classes-page-container">
      <section className="classes-intro" aria-labelledby="classes-page-title">
        <h1 id="classes-page-title">Character Classes</h1>
        <p>
          Explore the diverse classes available in Knights of Ages. Each class offers unique abilities and playstyles,
          allowing you to customize your adventure.
        </p>
      </section>
      <section className="classes-list" aria-label="List of Character Classes">
        {classesData.map(charClass => (
          <CharacterClassCard
            key={charClass.name}
            name={charClass.name}
            tagline={charClass.tagline}
            description={charClass.description}
            imageUrl={charClass.imageUrl}
            altText={charClass.altText}
          />
        ))}
      </section>
    </div>
  );
}

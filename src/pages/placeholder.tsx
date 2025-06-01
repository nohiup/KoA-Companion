/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="placeholder-page content-section">
      <h1>{title}</h1>
      <p>Content for the {title.toLowerCase()} page is coming soon. Check back later!</p>
      <img src={`https://via.placeholder.com/600x300/282629/D1C4E9?Text=${title}+Page`} alt={`${title} Placeholder`} style={{marginTop: '2rem', borderRadius: '8px'}} />
    </div>
  );
}

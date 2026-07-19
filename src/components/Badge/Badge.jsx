
export default function Badge({ children, tone = 'default' }) {
  const toneClass = tone === 'brass' ? 'tag-brass' : tone === 'teal' ? 'tag-teal' : '';
  return <span className={`tag ${toneClass}`}>{children}</span>;
}

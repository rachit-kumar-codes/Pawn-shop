const img = (seed) => `https://picsum.photos/seed/${seed}/600/600`;
const avatar = (seed) => `https://i.pravatar.cc/100?u=${seed}`;

// seeded data

export const posts = [
  { id: 'c1', user: { name: 'Ananya Rao', avatar: avatar('ananya') }, image: img('feed1'), caption: 'Finally completed my 1990s cricket card set after 3 years of hunting. Worth every rupee.', category: 'Trading Cards', likes: 214, comments: 32, createdAt: '2026-07-13' },
  { id: 'c2', user: { name: 'Vikram Shah', avatar: avatar('vikram') }, image: img('feed2'), caption: 'Found this Seiko diver at a flea market for a steal. Movement is buttery smooth.', category: 'Watches', likes: 178, comments: 21, createdAt: '2026-07-12' },
  { id: 'c3', user: { name: 'Meera Iyer', avatar: avatar('meera') }, image: img('feed3'), caption: "My grandmother's stamp album from the 1960s. Some of these are impossible to find now.", category: 'Stamps', likes: 340, comments: 54, createdAt: '2026-07-10' },
  { id: 'c4', user: { name: 'Arjun Malhotra', avatar: avatar('arjun') }, image: img('feed4'), caption: 'Vinyl haul from the weekend market. That Fleetwood Mac copy is mint condition!', category: 'Vinyl Records', likes: 129, comments: 18, createdAt: '2026-07-09' },
  { id: 'c5', user: { name: 'Priya Nair', avatar: avatar('priya') }, image: img('feed5'), caption: 'Restored this 1980s action figure myself, repainted the joints and it looks brand new.', category: 'Action Figures', likes: 96, comments: 12, createdAt: '2026-07-08' },
  { id: 'c6', user: { name: 'Karan Mehta', avatar: avatar('karan') }, image: img('feed6'), caption: 'Coin fair haul! Picked up three pieces I have been chasing for months.', category: 'Coins', likes: 155, comments: 27, createdAt: '2026-07-07' },
  { id: 'c7', user: { name: 'Ishita Bose', avatar: avatar('ishita') }, image: img('feed7'), caption: 'First edition comic finally arrived. The colors are so much brighter in person.', category: 'Comics', likes: 267, comments: 41, createdAt: '2026-07-06' },
  { id: 'c8', user: { name: 'Rohan Kapoor', avatar: avatar('rohan') }, image: img('feed8'), caption: 'Antique globe restoration project, week 2. The brass ring needed a lot of polishing.', category: 'Antiques', likes: 88, comments: 9, createdAt: '2026-07-05' },
  { id: 'c9', user: { name: 'Sneha Reddy', avatar: avatar('sneha') }, image: img('feed9'), caption: 'My holo card binder is finally organized by set. So satisfying to look at.', category: 'Trading Cards', likes: 203, comments: 30, createdAt: '2026-07-04' },
  { id: 'c10', user: { name: 'Aditya Verma', avatar: avatar('aditya') }, image: img('feed10'), caption: 'Vintage watch swap meet was a huge win today. Traded two for this beauty.', category: 'Watches', likes: 142, comments: 19, createdAt: '2026-07-03' },
  { id: 'c11', user: { name: 'Divya Menon', avatar: avatar('divya') }, image: img('feed11'), caption: 'Rare postal cover from the 70s just landed in my collection.', category: 'Stamps', likes: 71, comments: 8, createdAt: '2026-07-02' },
  { id: 'c12', user: { name: 'Sameer Joshi', avatar: avatar('sameer') }, image: img('feed12'), caption: 'Repressed classics only. This corner of my shelf is dedicated to 70s rock.', category: 'Vinyl Records', likes: 118, comments: 15, createdAt: '2026-07-01' },
  { id: 'c13', user: { name: 'Neha Kulkarni', avatar: avatar('neha') }, image: img('feed13'), caption: 'Display shelf update! Added the G1 Transformer I have wanted since childhood.', category: 'Action Figures', likes: 176, comments: 22, createdAt: '2026-06-30' },
  { id: 'c14', user: { name: 'Farhan Ali', avatar: avatar('farhan') }, image: img('feed14'), caption: 'Ancient coin authentication came back positive. Genuine Roman bronze!', category: 'Coins', likes: 233, comments: 37, createdAt: '2026-06-29' },
  { id: 'c15', user: { name: 'Tanvi Desai', avatar: avatar('tanvi') }, image: img('feed15'), caption: 'Key issue unboxing! This one took months of searching across three cities.', category: 'Comics', likes: 189, comments: 26, createdAt: '2026-06-28' },
  { id: 'c16', user: { name: 'Ravi Choudhary', avatar: avatar('ravi') }, image: img('feed16'), caption: 'Curio cabinet finally full. Every piece here has a story behind it.', category: 'Antiques', likes: 104, comments: 14, createdAt: '2026-06-27' },
];

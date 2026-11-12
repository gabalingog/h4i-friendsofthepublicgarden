// Placeholder data from the Figma mockup. Replace with real API data once the backend exists.

export type Photo = {
  id: number
  title: string
  uploader: string
  date: string
  tags: string[]
  unsplash: string
  confirmed: boolean
}

export type Collection = {
  id: number
  name: string
  description: string
  count: number
  cover: string
}

export const PHOTOS: Photo[] = [
  { id: 1, title: 'Swan Boats, Early May Morning', uploader: 'M. Callahan', date: '2024-05-03', tags: ['swan-boats', 'water', 'morning-light', 'seasonal'], unsplash: 'photo-1500534314209-a25ddb2bd429', confirmed: true },
  { id: 2, title: 'Make Way for Ducklings Statue', uploader: 'R. Okonkwo', date: '2024-04-18', tags: ['statues', 'landmarks', 'ducklings', 'bronze'], unsplash: 'photo-1499678329028-101435549a4e', confirmed: false },
  { id: 3, title: 'Weeping Willows, Lagoon Edge', uploader: 'T. Nguyen', date: '2024-06-12', tags: ['trees', 'lagoon', 'summer', 'willows'], unsplash: 'photo-1441974231531-c6227db76b6e', confirmed: true },
  { id: 4, title: 'Rose Garden in Full Bloom', uploader: 'S. Abramowitz', date: '2024-06-28', tags: ['flowers', 'roses', 'garden', 'color'], unsplash: 'photo-1605684437254-344f03b1e65c', confirmed: true },
  { id: 5, title: 'Ether Monument at Dusk', uploader: 'M. Callahan', date: '2024-07-04', tags: ['statues', 'monuments', 'dusk', 'historic'], unsplash: 'photo-1516912481808-3406841bd33c', confirmed: false },
  { id: 6, title: 'Families at the Frog Pond', uploader: 'J. Park', date: '2024-07-15', tags: ['people', 'families', 'frog-pond', 'summer'], unsplash: 'photo-1543946207-39bd91e70ca7', confirmed: true },
  { id: 7, title: 'Autumn Maples, Commonwealth Ave', uploader: 'R. Okonkwo', date: '2024-10-09', tags: ['autumn', 'trees', 'color', 'seasonal'], unsplash: 'photo-1473186578172-c141e6798cf4', confirmed: true },
  { id: 8, title: 'Swan Pair on the Lagoon', uploader: 'T. Nguyen', date: '2024-05-21', tags: ['wildlife', 'swans', 'water', 'lagoon'], unsplash: 'photo-1509515837298-2c67a3933321', confirmed: false },
  { id: 9, title: 'Tulip Border, Boylston Entrance', uploader: 'S. Abramowitz', date: '2024-04-30', tags: ['flowers', 'tulips', 'spring', 'color'], unsplash: 'photo-1416879595882-3373a0480b5b', confirmed: true },
  { id: 10, title: 'Winter Skating, Frog Pond', uploader: 'J. Park', date: '2024-01-14', tags: ['winter', 'frog-pond', 'skating', 'people'], unsplash: 'photo-1770859319862-b7ee4f464432', confirmed: true },
  { id: 11, title: 'Red-Tailed Hawk on Branch', uploader: 'M. Callahan', date: '2024-03-08', tags: ['wildlife', 'birds', 'hawk', 'nature'], unsplash: 'photo-1444464666168-49d633b86797', confirmed: false },
  { id: 12, title: 'Public Garden Panorama, Spring', uploader: 'R. Okonkwo', date: '2024-05-10', tags: ['panorama', 'spring', 'aerial', 'overview'], unsplash: 'photo-1558618666-fcd25c85cd64', confirmed: true },
]

export const COLLECTIONS: Collection[] = [
  { id: 1, name: 'Swan Boats', description: 'Iconic pedal-powered boats on the lagoon, from opening day to last autumn cruise.', count: 47, cover: 'photo-1500534314209-a25ddb2bd429' },
  { id: 2, name: 'Make Way for Ducklings', description: "Nancy Schön's beloved bronze ducklings and their surroundings through the seasons.", count: 23, cover: 'photo-1499678329028-101435549a4e' },
  { id: 3, name: 'Seasonal Views', description: 'The Garden across all four seasons — bloom, green, gold, and snow.', count: 118, cover: 'photo-1473186578172-c141e6798cf4' },
  { id: 4, name: 'Historic Monuments', description: 'The Ether Monument, Washington Equestrian Statue, and other landmarks in the Garden.', count: 34, cover: 'photo-1516912481808-3406841bd33c' },
  { id: 5, name: 'Garden in Bloom', description: 'Tulips, roses, dahlias, and annuals — the Garden horticulture collection.', count: 92, cover: 'photo-1605684437254-344f03b1e65c' },
  { id: 6, name: 'Wildlife & Birds', description: 'Resident swans, migratory birds, red-tailed hawks, and other Garden wildlife.', count: 61, cover: 'photo-1509515837298-2c67a3933321' },
]

export function unsplashUrl(id: string, w: number, h: number) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`
}

// Tags staff can filter by on the staff Browse page.
export const ALL_TAGS = ['swan-boats', 'wildlife', 'flowers', 'statues', 'people', 'seasonal', 'water', 'monuments', 'birds', 'winter', 'spring', 'autumn', 'summer', 'frog-pond', 'lagoon', 'trees', 'panorama']

// Friendly filter names on the public Browse page, and the photo tags each one covers.
export const PUBLIC_TAG_FILTERS: Record<string, string[]> = {
  People: ['people', 'families', 'skating'],
  'Animals & Wildlife': ['wildlife', 'animals', 'swans', 'hawk'],
  'Plants & Flowers': ['flowers', 'roses', 'garden', 'tulips', 'trees', 'willows'],
  'Park Scenes': ['panorama', 'overview', 'garden', 'trees', 'frog-pond'],
  'Statues & Monuments': ['statues', 'monuments', 'landmarks', 'bronze'],
  Birds: ['birds', 'hawk', 'swans'],
  'Water & Lagoon': ['water', 'lagoon', 'swan-boats'],
  Seasonal: ['seasonal', 'spring', 'summer', 'autumn', 'winter'],
}

export const PUBLIC_TAGS = Object.keys(PUBLIC_TAG_FILTERS)

export type GalleryImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  title?: string
  location?: string
  capturedAt?: string
  description?: string
}

export type GalleryProfile = {
  name: string
  tagline: string
  image: string
  highlight: string
  cta: string
}

export const galleryProfile: GalleryProfile = {
  name: 'Harmeet Singh',
  tagline: 'Small snapshots from the life behind the commits.',
  image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80',
  highlight:
    'Weekend hikes, sunrise coffee rituals, and candid moments with the people who keep me grounded.',
  cta: 'View Image Gallery',
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'mountain-trail',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    alt: 'Standing at the ridge watching sunrise spill over the hills',
    title: 'First Light',
    width: 1200,
    height: 1600,
    location: 'Triund, Himachal',
    capturedAt: 'October 2024',
    description: 'Solo hike reward—quiet air, hot chai, and a pink sky worth the climb.'
  },
  {
    id: 'city-evening',
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Leaning on a railing overlooking city lights after dusk',
    title: 'Golden Hour Rewind',
    width: 1200,
    height: 900,
    location: 'Chandigarh',
    capturedAt: 'June 2024',
    description: 'Cooling down after a run—with the playlist still in my ears and the skyline glowing.'
  },
  {
    id: 'coffee-break',
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    alt: 'Pouring latte art in a sunlit kitchen nook',
    title: 'Sunday Ritual',
    width: 1200,
    height: 1500,
    location: 'Home base',
    capturedAt: 'January 2025',
    description: 'My reset button: slow brew, a new playlist, and scribbling ideas in the notebook nearby.'
  },
  {
    id: 'book-lounge',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Relaxing with a favourite book and headphones beside a window',
    title: 'Quiet Chapters',
    width: 1200,
    height: 1500,
    location: 'Home library',
    capturedAt: 'August 2024',
    description: 'Wind-down hour with Murakami on the page and lo-fi in the background.'
  },
  {
    id: 'friends-laugh',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Laughing with close friends over street food',
    title: 'Laugh Lines',
    width: 1200,
    height: 900,
    location: 'Sector 17, Chandigarh',
    capturedAt: 'April 2024',
    description: 'Nothing beats late-night chaat and belly laughs with the core crew.'
  },
  {
    id: 'cycle-trail',
    src: 'https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Taking a break beside the cycle on a forest trail',
    title: 'Trail Pause',
    width: 1200,
    height: 1500,
    location: 'Siswan Forest',
    capturedAt: 'February 2025',
    description: 'Weekend cycling loop—parked up to soak in the green and stretch.'
  },
  {
    id: 'family-meal',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sharing home-cooked dinner with family',
    title: 'Sunday Spread',
    width: 1200,
    height: 850,
    location: 'Family home',
    capturedAt: 'December 2024',
    description: 'Cooking with mum and passing plates around the table—weekly non-negotiable.'
  },
  {
    id: 'studio-sessions',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Playing guitar in a cozy studio corner',
    title: 'Evening Jams',
    width: 1200,
    height: 1500,
    location: 'Bedroom studio',
    capturedAt: 'September 2024',
    description: 'Favorite way to unplug—loop pedal, dim lights, and chasing melodies.'
  },
  {
    id: 'seaside-stroll',
    src: 'https://images.unsplash.com/photo-1492446190781-58ac4285911d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Walking barefoot along the shoreline at sunset',
    title: 'Reset Walk',
    width: 1200,
    height: 800,
    location: 'Goa',
    capturedAt: 'November 2023',
    description: 'Annual getaway: salty air, journal in backpack, and zero notifications.'
  },
  {
    id: 'rooftop-chill',
    src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Sitting on the rooftop with fairy lights and a sketchbook',
    title: 'Night Sketches',
    width: 1200,
    height: 900,
    location: 'Chandigarh rooftop',
    capturedAt: 'May 2024',
    description: 'Rooftop breeze, doodles, and planning the next adventure under the stars.'
  },
]

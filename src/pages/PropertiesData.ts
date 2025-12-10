// src/pages/PropertiesData.ts

export interface Agent {
  name: string;
  phone: string;
  imageUrl: string;
}

export interface Property {
  id: string;
  imageUrl: string;
  title: string;
  address: string;
  location: string;    // e.g., 'London', 'Mexico'
  type: string;        // e.g., 'Bungalow', 'Apartment'
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  description: string;
  agent: Agent;        // New agent field
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070',
    title: 'Dvilla Residences Batu',
    address: '4604, Philli Lane Kiowa',
    location: 'London',
    type: 'Bungalow',
    beds: 5,
    baths: 3,
    sqft: 1400,
    price: 8930,
    description: "A stunning modern bungalow featuring an open-concept living area, state-of-the-art kitchen, and a private garden oasis perfect for evening relaxation.",
    agent: {
      name: "Sarah Jenkins",
      phone: "+1 (555) 123-4567",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 'p2',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075',
    title: 'PIK Villa House',
    address: '127, Boulevard Cockeysville',
    location: 'Mexico',
    type: 'Single Family Home',
    beds: 5,
    baths: 4,
    sqft: 7500,
    price: 60691,
    description: "Luxury defined. This massive single-family home offers panoramic views, a home theater, a 4-car garage, and an infinity pool overlooking the valley.",
    agent: {
      name: "Michael Rodriguez",
      phone: "+52 (55) 9876-5432",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 'p3',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053',
    title: 'Tungis Luxury',
    address: '900, Creside WI 54913',
    location: 'London',
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqft: 1300,
    price: 70245,
    description: "High-rise living at its finest. Enjoy city skyline views from this penthouse apartment with floor-to-ceiling windows and premium smart-home integration.",
    agent: {
      name: "Emma Watson",
      phone: "+44 20 1234 5678",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    id: 'p4',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070',
    title: 'Riviera Retreat',
    address: '2201, Ocean Ave, Malibu',
    location: 'Mexico',
    type: 'Bungalow',
    beds: 4,
    baths: 3,
    sqft: 2500,
    price: 12500,
    description: "Escape to the coast in this breezy bungalow. Features include a wrap-around porch, direct beach access, and a spacious master suite.",
    agent: {
      name: "John Doe",
      phone: "+1 (310) 555-0199",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  {
    id: 'p5',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    title: 'The Glass Apex',
    address: '88, Summit Dr, Beverly Hills',
    location: 'London',
    type: 'Single Family Home',
    beds: 6,
    baths: 5,
    sqft: 4500,
    price: 95000,
    description: "An architectural masterpiece. This home features glass walls, a rooftop lounge, and a climate-controlled wine cellar.",
    agent: {
      name: "Alice Cooper",
      phone: "+1 (310) 555-0100",
      imageUrl: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  },
  {
    id: 'p6',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974',
    title: 'Lakeside Haven',
    address: '14, Lakeview St, Austin',
    location: 'Mexico',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1100,
    price: 9200,
    description: "Cozy and convenient. This lakeside apartment offers easy access to hiking trails and features a modern kitchen with quartz countertops.",
    agent: {
      name: "Bob Smith",
      phone: "+1 (512) 555-0123",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    id: 'p7',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070',
    title: 'Urban Loft 22',
    address: '55, Main St, Downtown',
    location: 'London',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    sqft: 850,
    price: 5500,
    description: "Perfect for the young professional. This industrial-style loft features exposed brick walls, high ceilings, and is walking distance to the metro.",
    agent: {
      name: "Clara Oswald",
      phone: "+44 20 7946 0999",
      imageUrl: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  },
  {
    id: 'p8',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070',
    title: 'The Grand Estate',
    address: '101, Royal Gardens',
    location: 'Mexico',
    type: 'Single Family Home',
    beds: 8,
    baths: 7,
    sqft: 10000,
    price: 150000,
    description: "Fit for royalty. This estate includes a private cinema, tennis court, guest house, and manicured gardens sprawling over 2 acres.",
    agent: {
      name: "Diego Luna",
      phone: "+52 (55) 1234 5678",
      imageUrl: "https://randomuser.me/api/portraits/men/55.jpg"
    }
  }
];
const sampleListings = [
  // --- Beachfront ---
  {
    title: "Ashvem Cliffside Sunset Beach Villa",
    description: "Perched right on the serene cliffs of North Goa with direct private beach access, swaying coconut palms, and endless Arabian Sea sunset panoramas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6500,
    location: "Ashvem, Goa",
    country: "India",
    category: "Beachfront"
  },
  {
    title: "Varkala Cliff Eco-Beach Retreat",
    description: "Wake up to Arabian sea waves crashing against red laterite cliffs in this bohemian wooden sanctuary with hammock deck and fresh seafood dining.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4200,
    location: "Varkala, Kerala",
    country: "India",
    category: "Beachfront"
  },
  {
    title: "Havelock Island Turquoise Lagoon Villa",
    description: "Step straight onto Radhanagar Beach's soft white sands. Surrounded by dense tropical rainforest and crystal-clear turquoise waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Havelock Island, Andaman",
    country: "India",
    category: "Beachfront"
  },
  {
    title: "Gokarna Om Beach Coconut Grove Cottage",
    description: "A tranquil sanctuary nestled in coastal palm groves right on the golden sands of Om Beach, ideal for yoga, wellness, and quiet ocean walks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3800,
    location: "Gokarna, Karnataka",
    country: "India",
    category: "Beachfront"
  },

  // --- Iconic Cities ---
  {
    title: "Heritage Lakefront Haveli on Lake Pichola",
    description: "Experience royal Rajasthani hospitality with jharokha balconies overlooking the illuminated City Palace and Jag Mandir across serene waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8900,
    location: "Udaipur, Rajasthan",
    country: "India",
    category: "Iconic Cities"
  },
  {
    title: "Marine Drive Art Deco Penthouse",
    description: "Modern luxury high above Queen's Necklace in South Mumbai with floor-to-ceiling sea view glass walls and skyline sunsets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 12500,
    location: "Mumbai, Maharashtra",
    country: "India",
    category: "Iconic Cities"
  },
  {
    title: "Pink City Courtyard Palace Suite",
    description: "Historic Rajput architecture featuring intricate marble carvings, arched courtyards, and rooftop sunset views of Nahargarh Fort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7400,
    location: "Jaipur, Rajasthan",
    country: "India",
    category: "Iconic Cities"
  },
  {
    title: "Ganga Ghats Serene Riverfront Villa",
    description: "Peaceful spiritual retreat right above the sacred Ganga Ghats, offering sunrise boat rides, private yoga sessions, and evening aarti views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4900,
    location: "Varanasi, Uttar Pradesh",
    country: "India",
    category: "Iconic Cities"
  },

  // --- Mountains ---
  {
    title: "Solang Valley Cedar Wood Chalet",
    description: "Nestled in fragrant cedar forests with direct panoramic views of snow-capped Himalayan peaks, roaring fireplace, and apple orchard trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Manali, Himachal Pradesh",
    country: "India",
    category: "Mountains"
  },
  {
    title: "Munnar Misty Tea Plantation Cottage",
    description: "Wake up amidst rolling emerald green tea estates, morning mist, and panoramic views of the Western Ghats from your private wooden deck.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Munnar, Kerala",
    country: "India",
    category: "Mountains"
  },
  {
    title: "Darjeeling Kanchenjunga Peak View Lodge",
    description: "Historic British-colonial hill lodge offering spectacular sunrise vistas of the Kanchenjunga range and freshly brewed estate teas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Darjeeling, West Bengal",
    country: "India",
    category: "Mountains"
  },
  {
    title: "Mashobra Pine Forest Tree Lodge",
    description: "Perched in the dense pine wilderness near Shimla, offering tranquil nature walks, bonfire nights, and valley views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4600,
    location: "Shimla, Himachal Pradesh",
    country: "India",
    category: "Mountains"
  },

  // --- Castles & Heritage Forts ---
  {
    title: "Fort Chanwa Royal Heritage Castle",
    description: "Authentic red sandstone fortress palace with courtyards, heritage rooms, traditional Marwari cuisine, and royal folk music evenings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 9500,
    location: "Jodhpur, Rajasthan",
    country: "India",
    category: "Castles"
  },
  {
    title: "Golden Fort Sandstone Fortress Villa",
    description: "Live inside the living fort of Jaisalmer with ornate stone filigree windows, panoramic Thar desert views, and private royal rooftop.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7800,
    location: "Jaisalmer, Rajasthan",
    country: "India",
    category: "Castles"
  },
  {
    title: "Neemrana Heritage Fort Palace",
    description: "15th-century multi-tiered palace fortress stepped into the Aravalli hills with hanging gardens, zip-lining, and royal banquet halls.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 11000,
    location: "Alwar, Rajasthan",
    country: "India",
    category: "Castles"
  },

  // --- Amazing Pools ---
  {
    title: "Coorg Rainforest Heated Infinity Pool Villa",
    description: "Immerse yourself in nature with an elevated infinity pool overlooking dense Western Ghats rainforests and spice valleys.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "Coorg, Karnataka",
    country: "India",
    category: "Amazing Pools"
  },
  {
    title: "Candolim Glass Villa with Private Lagoon Pool",
    description: "Luxury private sanctuary in North Goa featuring an emerald lagoon pool, private sunbeds, and indoor-outdoor tropical living.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 14500,
    location: "Candolim, Goa",
    country: "India",
    category: "Amazing Pools"
  },
  {
    title: "Rishikesh Ganges Cliff Infinity Pool Retreat",
    description: "Swim above the sacred turquoise Ganges river in a private cliffside heated pool surrounded by Himalayan foothills.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 9800,
    location: "Rishikesh, Uttarakhand",
    country: "India",
    category: "Amazing Pools"
  },

  // --- Camping & Eco-Glamping ---
  {
    title: "Wayanad Bamboo Treehouse Sanctuary",
    description: "Live 40 feet above the ground in a sustainable bamboo treehouse amidst cardamom plantations, elephant corridors, and pristine nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Wayanad, Kerala",
    country: "India",
    category: "Camping"
  },
  {
    title: "Spiti Valley Stargazer Geodesic Dome",
    description: "Unparalleled stargazing beneath the clearest night skies in Asia from heated geodesic domes situated in the high cold desert.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5800,
    location: "Kaza, Spiti Valley",
    country: "India",
    category: "Camping"
  },
  {
    title: "Jim Corbett Luxury Jungle Safari Camp",
    description: "Canvas luxury suites bordering the tiger reserve with guided forest safaris, riverbank stargazing, and evening naturalist talks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6200,
    location: "Corbett, Uttarakhand",
    country: "India",
    category: "Camping"
  },

  // --- Farms & Plantations ---
  {
    title: "Chikmagalur Coffee Estate & Plantation House",
    description: "Immerse in the aroma of fresh Arabica coffee blossoms in this 100-acre private heritage plantation estate with private trekking trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Chikmagalur, Karnataka",
    country: "India",
    category: "Farms"
  },
  {
    title: "Nashik Vineyard & Winery Villa",
    description: "Private villa nestled in lush grape vineyards of the wine capital of India, with complimentary wine tastings and vineyard cycling.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6800,
    location: "Nashik, Maharashtra",
    country: "India",
    category: "Farms"
  },
  {
    title: "Ooty Organic Tea & Botanical Farmhouse",
    description: "Charming stone farmhouse in the Nilgiri hills surrounded by organic vegetable gardens, dairy cows, and rolling tea slopes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4900,
    location: "Ooty, Tamil Nadu",
    country: "India",
    category: "Farms"
  },
  {
    title: "Amritsar Heritage Mustard Farmstead",
    description: "Experience genuine Punjabi farm culture with tractor rides, freshly churned butter, tandoori cooking, and golden mustard fields.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Amritsar, Punjab",
    country: "India",
    category: "Farms"
  },

  // --- Arctic / Snow & Alpine Glacier ---
  {
    title: "Gulmarg Alpine Glass Igloo Snow Chalet",
    description: "Witness powdery snowfalls from a heated glass dome situated right next to the Apharwat Peak ski slopes and pine forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 9200,
    location: "Gulmarg, Kashmir",
    country: "India",
    category: "Arctic"
  },
  {
    title: "Auli Snow Ski Lodge & Winter Chalet",
    description: "Premier snow resort lodge in the Garhwal Himalayas offering ski rentals, cable car access, and 180-degree Nanda Devi views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7800,
    location: "Auli, Uttarakhand",
    country: "India",
    category: "Arctic"
  },
  {
    title: "Pahalgam Pine Valley Snow Cabin",
    description: "Picturesque wooden winter cabin by the frozen Lidder river with Bukhari wood heating, Kashmiri kahwa, and snow trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6900,
    location: "Pahalgam, Kashmir",
    country: "India",
    category: "Arctic"
  },

  // --- Luxury ---
  {
    title: "The Maharaja Grand Palace Estate",
    description: "Ultra-luxurious royal living in a 300-year-old palace with marble courtyards, private royal butler, vintage car fleet, and spa.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 28000,
    location: "Udaipur, Rajasthan",
    country: "India",
    category: "Luxury"
  },
  {
    title: "Alibaug Luxury Coastal Glass Estate",
    description: "Architectural masterpiece across 5 acres with private helipad, 25-meter lap pool, personal chef, and speedboat access from Mumbai.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 22000,
    location: "Alibaug, Maharashtra",
    country: "India",
    category: "Luxury"
  },
  {
    title: "Alleppey Royal Heritage Backwater Houseboat",
    description: "Private handcrafted air-conditioned luxury kettuvallam cruise through the scenic canals with traditional Kerala Ayurvedic feasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 15000,
    location: "Alleppey, Kerala",
    country: "India",
    category: "Luxury"
  },
  {
    title: "Vagator Ultra-Luxury Sunset Cliff Mansion",
    description: "Multi-level modern glass mansion hovering over the Arabian Sea with private DJ deck, jacuzzi, infinity pool, and concierge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 18500,
    location: "Vagator, Goa",
    country: "India",
    category: "Luxury"
  },

  // --- Trending ---
  {
    title: "Cherrapunji Living Root Eco-Lodge",
    description: "Architectural bamboo eco-lodge hovering above emerald waterfalls and ancient bio-engineered living root bridges in Meghalaya.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5400,
    location: "Cherrapunji, Meghalaya",
    country: "India",
    category: "Trending"
  },
  {
    title: "Hampi Bouldered Heritage Stone Cottage",
    description: "Set against the surreal monolithic boulder landscape of the Vijayanagara empire, overlooking paddy fields and Tungabhadra river.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4300,
    location: "Hampi, Karnataka",
    country: "India",
    category: "Trending"
  },
  {
    title: "Pangong Lake High-Altitude Glass Pod",
    description: "Experience the changing blues of Pangong Tso from solar-heated panoramic glass pods in Ladakh with oxygen-enriched suites.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 8200,
    location: "Leh Ladakh, Ladakh",
    country: "India",
    category: "Trending"
  }
];

module.exports = { data: sampleListings };
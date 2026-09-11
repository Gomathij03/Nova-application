const products = [
  {
    id: 1,
    name: "Classic Everyday Sneakers",
    category: "Shoes",
    brand: "Nova",
    gender: "Unisex",
    color: "Red",
    size: "8",
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description:
      "Comfortable everyday sneakers designed for casual styling and long-lasting comfort.",
  },
  {
    id: 2,
    name: "Premium Leather Sneakers",
    category: "Shoes",
    brand: "Urban",
    gender: "Men",
    color: "White",
    size: "9",
    price: 3199,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800",
    description:
      "Premium leather sneakers with a modern silhouette for everyday wear.",
  },
  {
    id: 3,
    name: "Canvas Casual Shoes",
    category: "Shoes",
    brand: "Street",
    gender: "Unisex",
    color: "Brown",
    size: "7",
    price: 1899,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 73,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    description:
      "Lightweight canvas shoes perfect for casual weekends and everyday outings.",
  },
  {
    id: 4,
    name: "Minimal Leather Bag",
    category: "Bags",
    brand: "Nova",
    gender: "Women",
    color: "Blue",
    size: "Medium",
    price: 2799,
    originalPrice: 3499,
    
    rating: 4.9,
    reviews: 152,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description:
      "A minimal leather bag with enough space for your daily essentials.",
  },
  {
    id: 5,
    name: "Classic Shoulder Bag",
    category: "Bags",
    brand: "Urban",
    gender: "Women",
    color: "Red",
    size: "Medium",
    price: 2299,
    originalPrice: 2999,
    
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    description:
      "Elegant shoulder bag combining everyday functionality with modern style.",
  },
  {
    id: 6,
    name: "Classic Analog Watch",
    category: "Watches",
    brand: "Titan",
    gender: "Men",
    color: "Brown",
    size: "Standard",
    price: 4599,
    originalPrice: 5999,
    
    rating: 4.8,
    reviews: 201,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800",
    description:
      "A refined analog watch with a timeless design suitable for work and occasions.",
  },
  {
    id: 7,
    name: "Elegant Women's Watch",
    category: "Watches",
    brand: "Fossil",
    gender: "Women",
    color: "Silver",
    size: "Standard",
    price: 5299,
    originalPrice: 6999,
    
    rating: 4.7,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800",
    description:
      "Elegant women's watch designed to complement both formal and casual outfits.",
  },
  {
    id: 8,
    name: "Premium Sunglasses",
    category: "Accessories",
    brand: "Ray",
    gender: "Unisex",
    color: "Black",
    size: "Standard",
    price: 1999,
    originalPrice: 2599,
   
    rating: 4.6,
    reviews: 91,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    description:
      "Modern sunglasses with a lightweight frame and premium finish.",
  },
  {
    id: 9,
    name: "Classic Cotton T-Shirt",
    category: "Clothing",
    brand: "Nova",
    gender: "Men",
    color: "White",
    size: "L",
    price: 899,
    originalPrice: 1299,
   
    rating: 4.5,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description:
      "Soft cotton T-shirt with a clean everyday fit.",
  },
  {
    id: 10,
    name: "Premium Women's Jacket",
    category: "Clothing",
    brand: "Urban",
    gender: "Women",
    color: "Black",
    size: "M",
    price: 3599,
    originalPrice: 4499,
    
    rating: 4.8,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    description:
      "A premium jacket designed for modern everyday styling.",
  },
  {
    id: 11,
    name: "Everyday Backpack",
    category: "Bags",
    brand: "Street",
    gender: "Unisex",
    color: "Black",
    size: "Large",
    price: 2199,
    originalPrice: 2799,
   
    rating: 4.7,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description:
      "Spacious everyday backpack for work, college and travel.",
  },
  {
    id: 12,
    name: "Sport Running Shoes",
    category: "Shoes",
    brand: "Nike",
    gender: "Unisex",
    color: "Pink",
    size: "9",
    price: 4299,
    originalPrice: 5499,
    
    rating: 4.9,
    reviews: 310,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800",
    description:
      "Performance-focused running shoes with a comfortable lightweight construction.",
  },
  {
    id: 13,
    name: "Women's Road Running Shoes",
    category: "Shoes",
    brand: "Nike",
    gender: "Women",
    color: "Black",
    size: "7",
    price: 2500,
    originalPrice: 4499,
    
    rating: 4.9,
    reviews: 310,
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-HQ2593-004_1.jpg?rnd=20200526195200&tr=w-900",
    description:
      "Performance-focused running shoes with a comfortable lightweight construction.",
  },
   {
    id: 14,
    name: "Women's Air Jordan 1 Retro High OG 'Pro Green' Shoes",
    category: "Shoes",
    brand: "Nike",
    gender: "Women",
    color: "pink",
    size: "8",
    price: 7999,
    originalPrice: 9500,
    
    rating: 4.9,
    reviews: 310,
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-FD2596-201_1.jpg?rnd=20200526195200&tr=w-900",
    description:
      "Performance-focused running shoes with a comfortable lightweight construction.",
  },
  {
    id: 15,
    name: "Women's Road Running Shoes",
    category: "Shoes",
    brand: "Nike",
    gender: "Women",
    color: "Black",
    size: "8",
    price: 6999,
    originalPrice: 9500,
    
    rating: 4.9,
    reviews: 310,
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-HQ3049-001_1.jpg?rnd=20200526195200&tr=w-900",
    description:
      "Performance-focused running shoes with a comfortable lightweight construction.",
  },
   {
    id: 16,
    name: "Women's Workout Shoes",
    category: "Shoes",
    brand: "Nike",
    gender: "Women",
    color: "Black",
    size: "8",
    price: 7999,
    originalPrice: 9999,
    
    rating: 4.9,
    reviews: 310,
    image:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/a/d/ad22b92Nike-HQ2620-502_1.jpg?rnd=20200526195200&tr=w-900",
    description:
      "Performance-focused running shoes with a comfortable lightweight construction.",
  },
];

export default products;
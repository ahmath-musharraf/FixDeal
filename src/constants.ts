export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
}

export interface CarListing {
  id: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  mileage: number;
  price: number;
  spec: string;
  image: string;
  logo: string;
  fulfilledByFD: boolean;
}

export const SERVICES: Service[] = [
  {
    id: 'buy',
    title: 'Buy Items',
    description: 'Explore the best deals in the island with transparent pricing.',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    color: 'emerald'
  },
  {
    id: 'sell',
    title: 'Sell Your Items',
    description: 'Get the best price for your items with our easy evaluation process.',
    icon: 'DollarSign',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    color: 'blue'
  },
  {
    id: 'rent',
    title: 'Rent Anything',
    description: 'Wide range of vehicles and equipment available for short and long term.',
    icon: 'Key',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    color: 'purple'
  },
  {
    id: 'service',
    title: 'Professional Services',
    description: 'Hassle-free maintenance and professional services at your doorstep.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    color: 'orange'
  }
];

export const CAR_LISTINGS: CarListing[] = [
  {
    id: '1',
    brand: 'Lamborghini',
    model: 'Huracan',
    trim: 'Perfomante',
    year: 2018,
    mileage: 69000,
    price: 855000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/lamborghini-logo-1000x1100.png',
    fulfilledByFD: true
  },
  {
    id: '2',
    brand: 'Lamborghini',
    model: 'Huracan',
    trim: 'Spyder',
    year: 2017,
    mileage: 78000,
    price: 655000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/lamborghini-logo-1000x1100.png',
    fulfilledByFD: true
  },
  {
    id: '3',
    brand: 'BMW',
    model: '7 series',
    trim: 'Alpina B7',
    year: 2017,
    mileage: 92000,
    price: 288000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1556122071-e404be745793?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/bmw-logo-2020-blue-white.png',
    fulfilledByFD: true
  },
  {
    id: '4',
    brand: 'Ferrari',
    model: '488',
    trim: 'Spider',
    year: 2019,
    mileage: 12000,
    price: 950000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/ferrari-logo-750x1100.png',
    fulfilledByFD: true
  },
  {
    id: '5',
    brand: 'Mercedes-Benz',
    model: 'G-Class',
    trim: 'G63 AMG',
    year: 2022,
    mileage: 5000,
    price: 1250000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-silver.png',
    fulfilledByFD: true
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'R8',
    trim: 'V10 Performance',
    year: 2021,
    mileage: 8000,
    price: 580000,
    spec: 'GCC',
    image: 'https://images.unsplash.com/photo-1603553329412-ad49c17b050e?auto=format&fit=crop&q=80&w=800',
    logo: 'https://www.carlogos.org/car-logos/audi-logo-2016.png',
    fulfilledByFD: true
  }
];

export const BRANDS = [
  'Toyota', 'Nissan', 'Ford', 'Hyundai', 'Mercedes', 'BMW', 'Audi', 'Porsche', 
  'Suzuki', 'Honda', 'Fiat', 'Skoda', 'Jeep', 'Mitsubishi', 'Mini Cooper', 
  'Chevrolet', 'Volkswagen'
];

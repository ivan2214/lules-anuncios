import { Image, Plan, Store } from "@prisma/client";

type safeStore = Omit<
  Store,
  "id" | "createdAt" | "updatedAt" | "plan" | "offers" | "planId"
>;

export const mockStore: safeStore[] = [
  {
    name: "Amazon",
    address: "123 Main Street",
    city: "New York",
    postalCode: "12345",
  },
  {
    name: "Ebay",
    address: "345 Street Ave",
    city: "Los Angeles",
    postalCode: "67890",
  },
  {
    name: "Shopify",
    address: "456 Main Street",
    city: "New York",
    postalCode: "12345",
  },
  {
    name: "Walmart",
    address: "789 Street Ave",
    city: "Los Angeles",
    postalCode: "67890",
  },
  {
    name: "Google",
    address: "123 Saint Rows",
    city: "California",
    postalCode: "14567",
  },
  {
    name: "Best Buy",
    address: "456 Street Ave",
    city: "Los Angeles",
    postalCode: "67890",
  },
];

type safePlan = Omit<Plan, "id" | "createdAt" | "updatedAt">;

export const mockPlan: safePlan[] = [
  {
    name: "Free",
    description: "Free plan",
    price: 0,
    offersLimit: "FREETIER_20",
    offerPublishQuantity: 20,
    isFree: true,
  },
  {
    name: "Basic",
    description: "Basic plan",
    price: 30,
    offersLimit: "BASIC_50",
    offerPublishQuantity: 50,
    isFree: false,
  },
  {
    name: "Pro",
    description: "Pro plan",
    price: 100,
    offersLimit: "PRO_100",
    offerPublishQuantity: 100,
    isFree: false,
  },
];

import { type Category } from "@prisma/client";

type SafeCategory = Omit<Category, "Offers" | "id">;

export const categories: SafeCategory[] = [
  {
    name: "Accesorios",
  },
  {
    name: "Ropa de bebe",
  },
  {
    name: "Jeans",
  },
  {
    name: "Camisas",
  },
  {
    name: "Pantalones",
  },
  {
    name: "Zapatos",
  },
  {
    name: "Computadoras",
  },
  {
    name: "Cocina",
  },
  {
    name: "Jardinería",
  },
  {
    name: "Electrodomesticos",
  },
  {
    name: "Cuidado personal",
  },
  {
    name: "Juguetes",
  },
  {
    name: "Aparatos",
  },
  {
    name: "Limpieza",
  },
  {
    name: "Cuidado personal",
  },
];

type SafeImage = Omit<
  Image,
  "createdAt" | "updatedAt" | "offer" | "id" | "OfferId"
>;

export const images: SafeImage[] = [
  {
    url: "https://images.unsplash.com/photo-1506804880640-f3205deb1b8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw0OTU4NDc2fHxlbnwwfHx8fHw%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w0OTU4NDc2fHxlbnwwfHx8fHw%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTd8NjQ5ODQ3fHxlbnwwfHx8fHw%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1506760105842-74c56599ed06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzNTU3MjQ4fHxlbnwwfHx8fHw%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1591607556862-da5e75ca41dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHxUUmdISHkzeDVqMHx8ZW58MHx8fHx8",
  },
  {
    url: "https://images.unsplash.com/photo-1577040609211-2967d0b67d28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3xUUmdISHkzeDVqMHx8ZW58MHx8fHx8",
  },
  {
    url: "https://images.unsplash.com/photo-1616088670801-35d2cc4b4bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1596152206972-524d46e0b22b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1633432032648-9d87613fb297?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1625972209897-a4a1d186dd05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1638260753148-d0316920e0af?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjZ8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1602583459551-c0e623f7af36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDN8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1618371287944-5df2f6a9240d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDh8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1627761785127-b97621bfbc76?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NTR8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1637208697695-63059005e7a6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NTh8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nzh8VFJnSEh5M3g1ajB8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1641719150618-0e2366b68937?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxBM1NoM3ZwYmczOHx8ZW58MHx8fHx8",
  },
  {
    url: "https://images.unsplash.com/photo-1601582067612-7a347874f27d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnxBM1NoM3ZwYmczOHx8ZW58MHx8fHx8",
  },
  {
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjF8QTNTaDN2cGJnMzh8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1506804880640-f3205deb1b8b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Nnw0OTU4NDc2fHxlbnwwfHx8fHw%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1634412327877-836164201d16?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw1NDM5MzQ5NHx8ZW58MHx8fHx8",
  },
  {
    url: "https://images.unsplash.com/photo-1488035044725-f8796a253c34?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTJ8NTQzOTM0OTR8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8NTQzOTM0OTR8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8NTQzOTM0OTR8fGVufDB8fHx8fA%3D%3D",
  },
];

export const randomPrices: number[] = [];

for (let i = 0; i < 25; i++) {
  randomPrices.push(Math.floor(Math.random() * 1000) + 1);
}

export const randonNameOffers: string[] = [
  "10% en articulos de tecnología",
  "10% en artículos de deportes",
  "10% en artículos de ropa",
  "55% de descuento en artículos de tecnología",
  "2x1 en tecnología",
  "Lleva 2 y pagas 1 en artículos seleccionados de limpieza",
  "Lleva 2 y pagas 1 en artículos de ropa",
  "Lleva 2 y pagas 1 en artículos de deportes",
  "Lleva 2 y pagas 1 en artículos de tecnología",
  "Lleva 2 y pagas 1 en artículos de ropa",
  "Lleva 2 y pagas 1 en artículos de deportes",
];

export const randomDescriptions: string[] = [
  "Descubre una selección increíble de tecnología con un 10% de descuento en toda la gama.",
  "Hazte con tus equipos deportivos favoritos y disfruta de un 10% de descuento en tu compra.",
  "Renueva tu armario con las últimas tendencias de moda y ahorra un 10% en cada artículo.",
  "¡Grandes ofertas en tecnología! Ahorra un 55% en una amplia gama de productos.",
  "No te pierdas esta oferta especial: llévate dos productos tecnológicos al precio de uno.",
  "Mantén tu hogar impecable con nuestra oferta 2x1 en artículos de limpieza seleccionados.",
  "Actualiza tu guardarropa con estilo y ahorra dinero: ¡lleva 2 y paga solo 1 en ropa!",
  "¡Equípate para tu próximo desafío deportivo con nuestra oferta 2x1 en artículos deportivos!",
  "Descubre lo último en tecnología y aprovecha nuestra oferta 2x1 en una amplia selección de productos.",
  "Renueva tu estilo con nuestras prendas de moda: llévate 2 y paga solo 1 en artículos de ropa.",
  "Haz deporte con estilo y ahorra: aprovecha nuestra oferta 2x1 en artículos deportivos seleccionados.",
];

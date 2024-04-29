import { db } from '@/lib/db';

interface queryParams {
  category?: string;
  search?: string;
  sort?: string;
  take?: string;
  skip?: string;
  orderBy?: 'asc' | 'desc';
  store?: string;
  madeForYou?: boolean;
}

export const getOffers = async (query?: queryParams) => {
  try {
    const { category, search, orderBy, skip, store, take } = query ?? {};

    let categoriesSeparatedByComma: string[] = [];

    // Verifica si category está definido y es una cadena no vacía
    if (category && typeof category === 'string' && category.length > 0) {
      categoriesSeparatedByComma = category.split(',');
    }

    const whereCondition: any = {
      title: {
        contains: search
      },
      store: {
        name: {
          contains: store
        }
      }
    };

    // Agrega la condición de categoría solo si categoriesSeparatedByComma no está vacío
    if (categoriesSeparatedByComma.length > 0) {
      whereCondition.categories = {
        some: {
          name: {
            in: categoriesSeparatedByComma
          }
        }
      };
    }

    const offers = await db.offer.findMany({
      where: whereCondition,
      take: Number(take) || 10,
      skip: Number(skip) || 0,
      orderBy: {
        createdAt: orderBy ?? 'desc'
      },
      include: {
        categories: true,
        images: true,
        store: true
      }
    });

    return offers;
  } catch (error) {
    // Manejar el error de manera adecuada, ya sea registrándolo, notificándolo al usuario, etc.
    console.error('Error al obtener ofertas:', error);
    throw error; // Lanzar el error nuevamente para que quien llame a la función pueda manejarlo si es necesario
  }
};

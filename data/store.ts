import { db } from '@/lib/db';

export const getStoreByEmail = async (email: string) => {
  try {
    const store = await db.store.findUnique({
      where: {
        email
      }
    });

    return store;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getStoreById = async (id?: string) => {
  if (!id) return null;
  try {
    const store = await db.store.findUnique({
      where: {
        id
      },
      include:{
        offers: true
      }
    });

    return store;
  } catch (error) {
    console.log(error);
    return null;
  }
};

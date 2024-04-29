import { faker } from '@faker-js/faker';

import { generateRandomOffer } from './generateRandomOffer';
import { generateRandomImages } from './generateRandomImages';
import { generateRandomMessages } from './generateRandomMessages';
import { generateRandomCategories } from './generateRandomCategories';
import { generateRandomPlan } from './generateRandomPlan';
import { generateRandomStore } from './generateRandomStore';
import { createFeaturesForPlans } from './generateFeatures';

export const createManyOffers = async () => {
  const randomNumberOffers = faker.number.int({ min: 10, max: 45 });
  for (let i = 0; i < randomNumberOffers; i++) {
    const plan = await generateRandomPlan();
    const store = await generateRandomStore(plan);

    const offer = await generateRandomOffer(store);
    await generateRandomCategories(offer);
    await generateRandomImages(offer);
    await generateRandomMessages(offer);

    console.log(`💼 Creando ofertas ${i + 1} de ${randomNumberOffers}...`);
    console.log('--------------------------------------');
  }
  await createFeaturesForPlans();
  console.log('--------------------------------------');
  console.log('✅ Ofertas generadas con éxito');
};

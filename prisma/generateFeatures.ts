import { faker } from '@faker-js/faker'
import { db } from '../lib/db'

// Función para crear características y asignarlas a los planes existentes
export const createFeaturesForPlans = async () => {
  // Obtener todos los planes existentes en la base de datos
  const plans = await db.plan.findMany()

  // Iterar sobre cada plan y crear una o más características para cada uno
  for (const plan of plans) {
    // Determinar la cantidad de características aleatorias que se crearán para este plan
    const numberOfFeatures = faker.number.int({ min: 1, max: 5 })

    // Crear características para el plan actual
    for (let i = 0; i < numberOfFeatures; i++) {
      // Generar datos aleatorios para la característica
      const featureName = faker.lorem.words()
      const featureDescription = faker.lorem.sentence()
      const featureStartDate = faker.date.past()
      const featureEndDate = faker.date.future()
      const featurePriority = faker.number.float({ min: 1, max: 10 })

      // Crear la característica y asignarla al plan actual
      await db.feature.create({
        data: {
          name: featureName,
          description: featureDescription,
          startDate: featureStartDate,
          endDate: featureEndDate,
          priority: featurePriority,
          Plan: { connect: { id: plan.id } }
        }
      })
    }
  }

  console.log('Características creadas y asignadas a los planes existentes.')
}

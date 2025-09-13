/// <reference types="cypress" />

// Database tasks for Cypress testing
export const dbTasks = {
  'db:seed': () => {
    // Database seeding handled by the database being initialized
    console.log('Database seeded for testing')
    return null
  },
  
  'db:clear': () => {
    // Database clearing handled by individual test cleanup
    console.log('Database cleared')
    return null
  }
}

export default dbTasks
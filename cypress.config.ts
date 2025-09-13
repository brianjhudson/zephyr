import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";
import { dbTasks } from "./cypress/tasks/db";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Register database tasks
      on('task', dbTasks);
      
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:3000", // your app's URL
    env: {
      CLERK_WEBHOOK_SECRET: "test_webhook_secret",
      CYPRESS: "true",
      DATABASE_URL: "file:./test.db"
    }
  },
});

**Getting Started:** Development Environment Setup

This guide details setting up your development environment for this application.

**Prerequisites:**

* **Docker:** [https://www.docker.com/](https://www.docker.com/)
* **Node.js and npm (or pnpm):** [https://nodejs.org/en](https://nodejs.org/en) (includes npm) or [https://pnpm.io/installation](https://pnpm.io/installation)
* **Prisma:** [https://www.prisma.io/](https://www.prisma.io/)

**Setup Instructions:**

1. **Start the Database:**

   Use Docker Compose to start the database in detached mode:

   ```bash
   docker compose up -d
   ```

2. **Install Dependencies:**

   After starting the database, install project dependencies:

   ```bash
   pnpm install  # Or npm install if using npm
   ```

3. **Start the Development Server:**

   Run the development server using `pnpm dev`:

   ```bash
   pnpm dev
   ```

4. **Initialize Prisma:**

   Set up Prisma in your project by running:

   ```bash
   npx prisma init
   ```

5. **Configure Environment Variables (Optional):**

   - Rename `.env.template` to `.env`.
   - Replace placeholder values in `.env` with your actual environment variables (API keys, database credentials, etc.). Refer to the `.env.template` file for guidance.

6. **Database Migrations and Seeding:**

   - Run Prisma migrations to update your database schema and generate the Prisma client:

     ```bash
     npx prisma migrate dev
     npx prisma generate
     ```

   - Seed your local database by accessing the following URL in your browser or an HTTP client:

     ```
     https://${your_server}:${your_port_number}/api/seed
     ```

     Replace `${your_server}` and `${your_port_number}` with your actual server address and port number (usually found in terminal output when starting the development server).# next-todo-app

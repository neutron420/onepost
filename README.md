<div align="center">

# OnePost 

<br/>

<div>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/PostgreSQL-14.5-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM">
  <img src="https://img.shields.io/badge/Auth.js-NextAuth-222?style=for-the-badge&logo=auth.js&logoColor=white" alt="Auth.js">
</div>

<br/>

**A simple, powerful social media scheduler designed to streamline your content workflow.**

<p>
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

[**Live Demo (link to your deployed project)**] · [**Report a Bug**] · [**Request a Feature**]

</div>

## 🌟 About The Project

OnePost is a full-stack web application that simplifies social media management. It allows users to schedule posts for various platforms in advance, ensuring a consistent and effective online presence. Built with a modern, type-safe technology stack, OnePost offers a robust and scalable solution for content creators, marketers, and businesses.

### 🛠️ Built With

This project leverages a modern, fully type-safe technology stack for a seamless development experience and a high-performance application.

* **Framework:** [Next.js](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/) & [Prisma](https://www.prisma.io/)
* **Authentication:** [Auth.js (NextAuth)](https://authjs.dev/)
* **File Uploads:** [UploadThing](https://uploadthing.com/)
* **Caching:** [Upstash Redis](https://upstash.com/)
* **Schema Validation:** [Zod](https://zod.dev/)
* **UI:** Headless UI & Lucide React Icons

## ✨ Key Features

* **Secure Authentication:** User accounts are protected with NextAuth, supporting various OAuth providers.
* **Post Scheduling:** Intuitive interface to create, edit, and schedule posts for future publication.
* **Image & Media Uploads:** Seamlessly upload and attach images to your scheduled posts via UploadThing.
* **Type-Safe Database:** Full end-to-end type safety from the database to the frontend with Drizzle ORM.
* **Modern UI/UX:** A clean, responsive, and user-friendly interface built with Tailwind CSS.

## 🚀 Getting Started

To get a local copy up and running for development, follow these steps.

### Prerequisites

You will need Node.js (version 18 or higher), a package manager (npm, yarn, or pnpm), and a PostgreSQL database instance.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your_username/onepost.git](https://github.com/your_username/onepost.git)
    cd onepost
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your credentials. You can use the `.env.example` file as a template.

    ```env
    # Database URL
    DATABASE_URL="your_postgresql_connection_string"

    # Authentication (example for GitHub)
    AUTH_GITHUB_ID="your_github_oauth_id"
    AUTH_GITHUB_SECRET="your_github_oauth_secret"
    AUTH_SECRET="your_auth_secret_key" # Generate a secret with `openssl rand -base64 32`

    # UploadThing API Keys
    UPLOADTHING_SECRET="your_uploadthing_secret"
    UPLOADTHING_APP_ID="your_uploadthing_app_id"
    ```

4.  **Push the database schema:**
    Apply the Drizzle schema to your PostgreSQL database.
    ```bash
    npm run db:push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/neutron420/onepost](https://github.com/neutron420/onepost)

## 🙏 Acknowledgments

* [Next.js Team](https://vercel.com/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [Auth.js](https://authjs.dev/)
* [UploadThing](https://uploadthing.com/)

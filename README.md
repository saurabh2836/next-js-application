Devoverflow - Stack Overflow Replica
Devoverflow is a replica of Stack Overflow built with Next.js 14. This project includes full functionality, from user management to question-and-answer interactions, similar to the original platform.

🚀 Tech Stack
* **Next.js 14**: Utilized for building the frontend with cool new features like Actions, eliminating the need for a backend API.
* **Clerk**: Handles user authentication and social media login.
* **MongoDB**: Used as the database for managing questions, tags, answers, and user interactions.
* **Shadcdn**: Provides reusable UI components, enhancing the development speed.
* **TypeScript**: Implemented for strict type checking and maintaining code quality.
* **Tailwind CSS**: Utilized for building responsive and aesthetically pleasing UI with dual theme support (dark & light mode).
* **Vercel**: Deployed on Vercel for fast and efficient hosting.

  
🎯 Key Features

👉 **Authentication**: Secure sign-in with NextAuth, supporting Email/Password, Google, and GitHub.

👉 **Home** Page: Displays questions with filters, search, and pagination for easy navigation.

👉 **Recommendations**: Personalized suggestions on the home page.

👉 **Complex Layout**: Organized layout with popular questions and tags in view.

👉 **Question Details**: View questions with rich content, including images and code blocks.

👉 **Voting**: Upvote/downvote on questions to highlight helpful content.

👉 **View Counter**: Tracks the number of views for each question.

👉 **Bookmarking**: Save questions for quick access later.

👉 **Answer Posting**: MDX editor with light/dark modes for submitting answers.

👉 **Answer Filtering**: Sort answers by newest or most-voted, with pagination.

👉 **Answer Voting**: Upvote/downvote answers to rank quality responses.

👉 **Collections**: Organized saved questions with filters, search, and pagination.

👉 **Community**: Browse all users with search, filters, and pagination.

👉 **Profile**: View user info, badges, and engagement history with pagination.

👉 **Job Finder**: Discover jobs with filters and search, tailored to the user’s location.

👉 **Tags Page**: List of all tags with question counts, filters, and pagination.

👉 **Tag Details**: View questions by tag with search and pagination.

👉 **Ask a Question**: Simple interface for posting new questions.

👉 **Edit & Delete**: Update or remove questions and answers with validation and authorization.

👉 **Global Search**: Find content across questions, users, tags, and more.

👉 **Responsive Design**: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

👉 **High Performance**: Fast loading and smooth interactions for an efficient user experience.and many more, including code architecture and reusability


**💡 Lessons Learned**
* This project was a fantastic learning experience, especially in mastering the Next.js framework, integrating Clerk for seamless user management, and utilizing MongoDB for data handling. I also explored how to build efficient UI components using Shadcdn and implement TypeScript for strict type checking. The deployment process using Vercel taught me about CI/CD pipelines for smooth production-ready builds.

Inspired by tutorials from **JS Mastery.**

📦 Installation
Clone the repository:

bash

Copy code

git clone https://github.com/saurabh2836/next-js-application

cd devoverflow

Install dependencies:

bash

Copy code

npm install

**Set up environment variables:**

Add your MongoDB and Clerk credentials to a .env.local file.

**Run the development server:**

bash
Copy code

npm run dev

Open your browser to http://localhost:3000 to see the project live.

🌐 Deployment
Devoverflow is deployed on Vercel. Check it out here.

This README provides a clear overview of your project and technology stack while highlighting your learnings. You can also add screenshots or GIFs to make it more visually engaging!

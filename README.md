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
*  Full user authentication and management via Clerk (including social logins).
* Create, edit, and delete questions and answers.
* Support for tags and user interaction (upvotes, comments).
* Light and dark mode with Tailwind CSS.
* Real-time updates with MongoDB and Next.js.
* No separate backend required, thanks to Next.js Actions.
* Local and Global Search option for all your data based on data in the database.


**💡 Lessons Learned**
* This project was a fantastic learning experience, especially in mastering the Next.js framework, integrating Clerk for seamless user management, and utilizing MongoDB for data handling. I also explored how to build efficient UI components using Shadcdn and implement TypeScript for strict type checking. The deployment process using Vercel taught me about CI/CD pipelines for smooth production-ready builds.

Inspired by tutorials from **JS Mastery.**

📦 Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/devoverflow.git
cd devoverflow
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Add your MongoDB and Clerk credentials to a .env.local file.
Run the development server:

bash
Copy code
npm run dev
Open your browser to http://localhost:3000 to see the project live.

🌐 Deployment
Devoverflow is deployed on Vercel. Check it out here.

This README provides a clear overview of your project and technology stack while highlighting your learnings. You can also add screenshots or GIFs to make it more visually engaging!

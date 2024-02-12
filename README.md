# supabase-next14-redux-auth

Welcome to the `supabase-next14-redux-auth` boilerplate, your starting point for integrating Supabase authentication with a Next.js 14 and Redux project. This setup is designed to streamline the process of adding login and logout functionality to your application, leveraging the power of Supabase for backend services and Redux for state management.

## Features

- **Supabase Authentication**: Utilize Supabase for handling user authentication, including sign up, login, and logout functionalities.
- **Next.js 14 Integration**: Built with the latest version of Next.js to take advantage of its features and optimizations for React-based applications.
- **Redux State Management**: Incorporates Redux for efficient state management across your Next.js application, ensuring a seamless flow of user authentication states.
- **Environment Configuration**: Easy setup with environment variables for connecting to your Supabase project.

## Getting Started

To get started with this boilerplate, follow these steps:

1. **Setup a Supabase Account**
   - If you haven't already, sign up for a Supabase account at [https://supabase.com](https://supabase.com).
   - Create a new project in Supabase and take note of your project's URL and Anon Key, which you'll need for connecting your Next.js application to Supabase.

2. **Clone the Repository**
   - Clone this repository to your local machine to begin working on your project.

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root of your project.
   - Add the following environment variables with your Supabase project details:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - Replace `your_supabase_url` and `your_supabase_anon_key` with the actual URL and Anon Key of your Supabase project.

4. **Install Dependencies**
   - Run `npm install` or `yarn install` to install the necessary dependencies for the project.

5. **Run the Development Server**
   - Start the development server with `npm run dev` or `yarn dev`.
   - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

For more detailed information on using Supabase, Next.js, and Redux, refer to their respective documentation:

- **Supabase**: [https://supabase.com/docs](https://supabase.com/docs)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Redux**: [https://redux.js.org/introduction/getting-started](https://redux.js.org/introduction/getting-started)

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Happy coding!

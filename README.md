# untangled

Untangled is a little content management system experiment. 


Running it locally requires a React project with the necessary dependencies.

1. Set up a new React project:
   Create one using Create React App or Next.js. For this example, let's use Create React App:

   ```
   npx create-react-app untangle-cms
   cd untangle-cms
   ```

2. Install necessary dependencies:
   ```
   npm install @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-label recharts date-fns
   ```

3. Install Tailwind CSS (for styling):
   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Configure Tailwind CSS:
   Replace the content of `tailwind.config.js` with:

   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

5. Add Tailwind directives to your CSS:
   In your `src/index.css` file, add these lines:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

6. Create new files:
   In the `src` folder, create a new file called `Untangle.js` and paste the entire Untangle component code from the artifact.

7. Update `src/App.js`:
   Replace the content of `App.js` with:

   ```jsx
   import React from 'react';
   import Untangle from './Untangle';

   function App() {
     return (
       <div className="App">
         <Untangle />
       </div>
     );
   }

   export default App;
   ```

8. Create a components folder:
   Since we're using `@/components/ui/...` in our imports, create a folder structure `src/components/ui/` and add stub files for the components we're using (card.js, button.js, input.js, etc.). For now, these can just export placeholder components.

   For example, in `src/components/ui/card.js`:

   ```jsx
   export const Card = ({ children, className, ...props }) => (
     <div className={`bg-white shadow rounded-lg p-4 ${className}`} {...props}>{children}</div>
   );
   export const CardHeader = ({ children, ...props }) => <div {...props}>{children}</div>;
   export const CardTitle = ({ children, ...props }) => <h3 className="text-lg font-semibold" {...props}>{children}</h3>;
   export const CardContent = ({ children, ...props }) => <div {...props}>{children}</div>;
   export const CardFooter = ({ children, ...props }) => <div className="mt-4" {...props}>{children}</div>;
   ```

   Do something similar for the other components (button, input, select, etc.).

9. Run the application:
   ```
   npm start
   ```

The Untangle CMS should now be running on `http://localhost:3000`.

For now... this is a frontend-only implementation. The mock API functions are simulating backend behavior, so data won't persist between page refreshes. 

TODO: connect these functions to an actual backend API.

Also, some features like the Calendar might not work perfectly without additional setup or libraries.

To fully test out all features and interactions, you might want to:

1. Create a few posts using the Create Post form.
2. Edit existing posts.
3. Delete posts.
4. Check the Calendar view to see scheduled posts.
5. View the Analytics tab to see the charts (though with mock data, they might not change much).


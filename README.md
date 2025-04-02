# Workout AI Generator

This is a full-stack application built using Node.js and MongoDB on the backend, and HTML/EJS/CSS on the frontend. The website generates a curated workout for the user based on their form inputs (i.e weight, height, goal, focus, etc.) and also allows the user to save workouts to their profile. Users can log exercises to track their progress.

### Installation
Follow these steps to set up the project on your local machine:  

1. **Clone the Repository**  
   Clone the repository using Git:
   ```sh
   git clone git@github.com:christinabrgs/Demo-Day.git
   ```

2. **Navigate to the Project Directory**  
   Change to the project directory:
   ```sh
   cd Demo-Day
   ```

3. **Install Dependencies**  
   Run the following command to install the project dependencies:
   ```sh
   npm install
   ```

4. **Configure API Key**  
   - Open `controllers/workouts.js`.
   - Locate line 9 where the `apiKey` variable is defined.
   - Replace `'placeholder'` with your **OpenAI API key**.

5. **Start the Application**  
   Start the server with:
   ```sh
   node server.js
   ```

6. **Access the Application**  
   Open your web browser and go to:
   ```
   http://localhost:2121
   ```

7. **Generate and Track Workouts**  
   - Navigate to the "Generate Workouts" page via the navigation button in the header.
   - Customize and generate your workout.
   - Click the **Save** button to store it in your profile.
   - Track your progress!

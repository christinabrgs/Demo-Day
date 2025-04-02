# Workout Generator

This is a full-stack application built using Node.js and MongoDB on the backend, and HTML/EJS/CSS on the frontend. The website generates a curated workout for the user based on their form inputs (i.e weight, height, goal, focus, etc.) and also allows the user to save workouts to their profile. Users can log exercises to track their progress.

Installation
Follow these steps to set up the project on your local machine:  

1. **Clone the Repository**  
   ```sh
   git clone git@github.com:christinabrgs/Demo-Day.git
Navigate to the Project Directory

   ```sh
   cd Demo-Day
Install Dependencies

2. **Navigate to the Project Directory**
   ```sh
   npm install
   
3. **Configure API Key**

Open controllers/workouts.js.
Locate line 9 and replace 'placeholder' in the apiKey variable with your OpenAI API key.

4. **Start the Application**

   ```sh
   node server.js
Open your web browser and go to http://localhost:2121.

5. **Generate and Track Workouts**

Navigate to the "Generate Workouts" page via the navigation button in the header.

Customize and generate your workout.

Click the "Save" button to store it in your profile.

Start tracking your progress!








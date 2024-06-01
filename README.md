# MimKviz - Serbian Memes Quiz Game

Frontend of a MimKviz application for a quiz game featuring Serbian and regional memes. Players can answer both easy and difficult questions within a time limit of 12 seconds per question. The game fetches data from a Python Django backend and utilizes various technologies such as Vite React, Reducer, Context API, and CSS modules.

[Play the game online at mimkviz.com](https://mimkviz.com)

## Features

- **Two Difficulty Levels**: The quiz game includes 6 less difficult and 6 more difficult questions from Serbian memes.
- **Time Limit**: Players have 12 seconds to answer each question.
- **Scoring System**: Players can earn a maximum of 180 points, with 10 points for less difficult questions and 20 points for more difficult ones.
- **Cryptographic Answer Encryption**: Correct answers are encrypted using CryptoJS to prevent users from viewing them in browser components tools.
- **Leaderboard**: If a player achieves a high score, a POST request updates the leaderboard table.
- **Time Tracking**: The program tracks the time taken by players to complete the game, with faster times resulting in better positions.
- **Game Counter**: Keeps track of the total number of games played.
- **CSS Modules**: Utilizes CSS modules for styling the components.

## Technologies Used

- Vite React
- Reducer
- Context API
- CryptoJS
- CSS Modules

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.

## Usage

1. Access the start screen to begin the quiz.
2. Answer the questions within the given time limit.
3. Finish the quiz and submit your score.
4. View the leaderboard to see high scores.

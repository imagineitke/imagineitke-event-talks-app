# imagineitke-event-talks-app

A single-page website for a 1-day event filled with technical talks.

## Features

*   Displays a full-day schedule of technical talks.
*   Includes details for each talk: title, speakers, categories, and description.
*   Allows users to filter talks by category in real-time.
*   Built with a serverless approach, resulting in a single `index.html` file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:

*   [Node.js](https://nodejs.org/) (which includes npm)
*   [Python](https://www.python.org/)

### Installation and Building

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/imagineitke/imagineitke-event-talks-app.git
    cd imagineitke-event-talks-app
    ```

2.  **Build the website:**
    This command will read the source files from the `src` directory and generate a single `index.html` file in the `dist` directory.
    ```bash
    npm install
    npm run build
    ```

### Running the Website

1.  **Navigate to the `dist` directory:**
    ```bash
    cd dist
    ```

2.  **Start a simple Python web server:**
    If you have Python 3, run:
    ```bash
    python3 -m http.server
    ```
    If you have Python 2, run:
    ```bash
    python -m SimpleHTTPServer
    ```

3.  **Open the website in your browser:**
    Open your web browser and go to the following address:
    [http://localhost:8000](http://localhost:8000)

## Project Structure

*   `.gitignore`: Specifies which files and directories to ignore in version control.
*   `build.js`: A Node.js script that builds the website.
*   `package.json`: Defines the project and its dependencies.
*   `src/`: Contains the source files for the website.
    *   `index.html`: The HTML template for the website.
    *   `style.css`: The CSS styles for the website.
    *   `script.js`: The JavaScript logic for the website.
*   `dist/`: Contains the generated website files.
    *   `index.html`: The final, single-page website.

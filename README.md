# Nepali Web Scraper and Facebook Publisher

Nepali Web Scraper and Facebook Publisher is a Node.js application designed to automate the process of scraping news articles from selected Nepali websites and seamlessly publishing them on a Facebook page. This README offers a comprehensive guide to the project, including setup instructions and usage details.

## Prerequisites

Before running this project, ensure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or access to a MongoDB Atlas instance
- A Facebook Page and a corresponding Facebook Developer App with the necessary permissions
- A Facebook Access Token and the associated Page ID

## Installation

1.  Clone the repository:
    `git clone https://github.com/anishjoshi1999/WebScraping.git`
    `cd WebScraping`

2.  Install dependencies:
    `npm install`

## Configuration

1.  Create a `.env` file in the project root and add your configuration values:

    # MongoDB Configuration

    `MONGODB_URI=mongodb+srv://your-username:your-password@your-database-url/your-database-name`

    # Facebook Configuration

    `FACEBOOK_PAGE_ID=your-facebook-page-id`
    `FACEBOOK_ACCESS_TOKEN=your-facebook-access-token`

    # Nepali Website URLs for Scraping

    `NEPALI_WEBSITE_1=https://www.example.com/nepali-news`
    `NEPALI_WEBSITE_2=https://www.example.com/nepali-news2`

    # Add more websites as needed

2.  Ensure your MongoDB instance is up and running and accessible.
    Usage

---

### Starting the Application

To launch the Node.js application, run:

`npm start`

The application will start and listen on the specified port (default is 3000).

### Endpoints

- `/facebook`: This endpoint automatically publishes scraped news articles on your Facebook page.
- `/scrape`: Use this endpoint to scrape news articles from selected Nepali websites and store them in the MongoDB database.

You can access these endpoints using HTTP GET requests. For instance:

- To post scraped news articles on Facebook: <http://localhost:3000/facebook>
- To scrape news articles: <http://localhost:3000/scrape>

### Example Requests

You can utilize tools like `curl` or Postman to send GET requests to the endpoints mentioned above. Make sure to replace `localhost:3000` with the appropriate URL if you're hosting the application elsewhere.

## License

This project is licensed under the [MIT License](https://chat.openai.com/c/LICENSE).

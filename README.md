# NepaliAutoPublisher

NepaliAutoPublisher is a Node.js application designed to automate the process of scraping news articles from selected Nepali websites and seamlessly publishing them on a Facebook page. This README offers a comprehensive guide to the project, including setup instructions and usage details.

## Prerequisites

Before running this project, ensure you have the following prerequisites in place:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or access to a MongoDB Atlas instance
- A Facebook Page and a corresponding Facebook Developer App with the necessary permissions
- A Facebook Access Token and the associated Page ID

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anishjoshi1999/NepaliAutoPublisher.git
   cd NepaliAutoPublisher

   ```

2. Install dependencies:
   `npm install`

## Configuration

Create a `.env` file in the project root and add your configuration values:

### MongoDB Configuration:

- `MONGODB_ATLAS_USERNAME`: Replace with your MongoDB Atlas username.
- `MONGODB_ATLAS_PASSWORD`: Replace with your MongoDB Atlas password.
- `MONGODB_ATLAS_COLLECTION`: Replace with the name of your MongoDB Atlas collection.
- `PORT`: Replace with the desired port number for your application.

### Facebook Configuration:

- `FACEBOOK_PAGE_ID`: Replace with your Facebook Page ID.
- `FACEBOOK_ACCESS_TOKEN`: Replace with your Facebook Access Token.

2.  Ensure your MongoDB instance is up and running and accessible.
    Usage

---

### Starting the Application

To launch the Node.js application, run:

`npm start`

The application will start and listen on the specified port (default is 3000).

### Endpoints

- `/scrape`: Use this endpoint to scrape news articles from selected Nepali websites and store them in the MongoDB database.
- `/facebook`: This endpoint automatically publishes scraped news articles on your Facebook page.
- `/greet`: This endpoint performs an automatic greeting by posting both morning and goodnight quotes on your Facebook page.

You can access these endpoints using HTTP GET requests. For instance:

- To post scraped news articles on Facebook: <http://localhost:3000/facebook>
- To scrape news articles: <http://localhost:3000/scrape>

### Example Requests

You can utilize tools like `curl` or Postman to send GET requests to the endpoints mentioned above. Make sure to replace `localhost:3000` with the appropriate URL if you're hosting the application elsewhere.

## License

This project is open-source and is available under the [MIT License](LICENSE). Feel free to use, modify, and distribute this software according to the terms and conditions outlined in the license.

The MIT License is a permissive open-source license that allows for a wide range of uses, including commercial projects, without imposing many restrictions. It grants users the freedom to use the software while providing some protection to the project's original authors.

For more details, please review the [LICENSE](LICENSE) file included in this repository.

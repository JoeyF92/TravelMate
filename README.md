# Travel Mate - Your Ultimate Travel Companion

Travel Mate is a cutting-edge travel companion app that simplifies and enhances every aspect of your travel experience. Say goodbye to the hassle of scattered memories, burdensome travel planning, and complex photo sharing. With Travel Mate, your journeys become seamlessly captured, collaboratively shared, and expertly planned – all within the palm of your hand.

## Key Features

- Collaborative Digital Memories: 
    * Effortlessly create and share travel albums, inviting fellow travelers to contribute their own memories through a simple share code. Experience the joy of reliving your adventures together in a central hub of collective memories.

- AI-Powered Trip Planning: 
    * Wave goodbye to the stress of crafting group travel itineraries. Travel Mate's advanced AI technology curates personalized itineraries based on each traveler's unique preferences. Simply share your favorite foods, hobbies, and interests, and let Travel Mate design an itinerary that resonates with everyone. Plus, explore nearby dining spots with AI-generated recommendations.

- User-Friendly Packing List: 
    * Stay organized and well-prepared with our user-friendly packing list feature. Ensure that no essential item is forgotten as you embark on your journey.

## Getting Started

### Server

Create a virtual environment using pipenv:

```bash
pipenv shell
```
Install the dependencies that will be needed:

```bash
pipenv install -r requirements.txt
```

Create a database instance on [ElephantSQL](https://www.elephantsql.com/), and copy/paste the URL of the instance into the .env folder of the project:

```bash
DATABASE_URL=[YOUR_URL]
```
Setup the database with the project by entering a python shell in the terminal, and then running the following commands:

```bash
>>> create_db.py
```

### Client

Install dependencies that will be needed:

```bash
npm install
```

## Usage

Run the project on localhost by entering the following in the terminal:

### Server folder:

```bash
pipenv run dev
```

### Client folder:

```bash
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

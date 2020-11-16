# Joe

Joe is an API for managing owners. The API allows you to register owners, consult owners by ID and consult the owner closest to a given coordinate.


### Set environment variables
```
cp .env.example .env
```

### Run application (container)
```
docker-compose up -d
```

### Run application (development)
```sh
# set the DB_HOST environment variable to the value mongodb://localhost:27017/joe
# in the .env file
npm install
npm run dev
```

### Run tests
```
npm run test
```


### Using the API

The API port is set to 3000 by default in the .env file and you can update this value. The url is http://localhost:3000/api. To check if everything is correct, access the url http://localhost:3000/api/healthcheck.

#### Create one owner
The endpoint for creating owners is:
POST http://localhost:3000/api/owners

1. The `address` field follows the `GeoJSON Point` format (https://en.wikipedia.org/wiki/GeoJSON);
2. The `coverageArea` field follows the `GeoJSON MultiPolygon` format (https://en.wikipedia.org/wiki/GeoJSON);
3. The `document` must be a unique field;
4. The `id` must be a unique field, but not necessarily an integer;

Body:
```json
{
  "id": 1,
  "tradingName": "Adega da Cerveja - Pinheiros",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```
Success Response:
```
HTTP/1.1 201 Created
```

#### Get one owner by its ID
The endpoint for searching owner by its `id` is:
POST http://localhost:3000/api/owners/{id}

Success Response:
```
HTTP/1.1 200 OK
```

#### Get the nearest owner
The endpoint for searching the nearest owner to a given coordinate (long, lat):
POST http://localhost:3000/api/owners?long={long}&lat={lat}

Success Response:
```
HTTP/1.1 200 OK
```
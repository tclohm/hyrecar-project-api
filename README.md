# rentalcar-api

### Clone

```
$ git clone git@github.com:tclohm/rentalcar-api.git
```

### Install Third Parties

```
$ yarn install
```

### Run the app

```
$ yarn start
```

Restart the app automatically every time code changes. Useful during development.

```
$ yarn dev
```

### Tests

No tests implemented as of now :(

### How it's built

It's a simple Node.js/Postgres with Apollo/Graphql sitting on top waiting for queries and mutations. It's pretty straightforward. Authentication comes from a cookie on the server and checks for permissions at each request.
The application is not hosted because it's still in development.

### Client side

[Rentalcar Web](https://github.com/tclohm/rentalcar)

## License

MIT. Copyright (c)

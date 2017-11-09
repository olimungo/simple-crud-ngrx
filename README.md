# SimpleCRUD with ngrx

This project is a simple CRUD (Create, Retrieve Update and Delete) implementation using ngrx (Redux implementation for Angular using Observables).

It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

The following instructions assumes that you're using `npm` to install dependencies, but feel free to replace the related commands with the `yarn`'s one.

## Demo

Want to check what this application looks like? Try it here: <a href="https://simplecrud-b97b4.firebaseapp.com" target="_blank">Demo</a>

## Pre-requisites

The following tools have to be installed:

- node and npm: check `https://nodejs.org`
- angular-cli: `npm install -g @angular-cli`
- json-server: `npm install -g json-server`
- ts-node: `npm install -g ts-node`
- firebase-tools: `npm install -g firebase-tools` (only needed if you plan to deploy on Firebase)

## Back-end

### Development

json-server is used for the back-end. It's a full REST API server based on a json file (read and write). To start it up, use the following command: `npm run back-end`

### Production

Firebase Realtime Database (`https://firebase.google.com`) is used as back-end for the Production-like environment. In order to mimic the local database, the Firebase REST API is used to retrieve and update the data. So, angularfire isn't used on this project.

## Data generation

Fake mock data can be generated for the local json-server and for Firebase. Look into the `back-end/scripts` folder for the `generate.ts` file. When executed, it will generate a `db.json` file in the same folder.

The good news is that they both rely on a JSON structure to store the data. The bad news is that they don't do it exactly the same way. The json-server uses an array to store sub-objects while Firebase uses an object to store sub-objects.

```
json-server

  actors: [
    {
      "id": 00585688-2e3b-4564-834f-1296122931bd",
      "firstname": "Enzo",
      "lastname": "Voort"
    },
    {
      "id": "00cca10d-5033-48ff-a3c6-70dcd54d77b4",
      "firstname": "Enzo",
      "lastname": "Voort"
    },
    {
      "id": "03aa3ff1-873c-44d3-a02e-360c748b81ea",
      "firstname": "Ed",
      "lastname": "Cetaera"
    },
    ...
  ]
}
```

```
Firebase

  actors: {
    "00585688-2e3b-4564-834f-1296122931bd": {
      "firstname": "Ed",
      "lastname": "Cetaera"
      },
    "00cca10d-5033-48ff-a3c6-70dcd54d77b4": {
      "firstname": "Enzo",
      "lastname": "Voort"
      },
    "03aa3ff1-873c-44d3-a02e-360c748b81ea": {
      "firstname": "Ed",
      "lastname": "Cetaera"
      },
    ...
  }
}
```

Change the mode variable in the `generate.ts` file to InternalIds or ExternalIds to match the targeted environment.

The application is also deployed on Firebase hosting. You may give it a look here: https://simplecrud-b97b4.firebaseapp.com

## Front-end

Run `ng serve` for a dev server. Navigate to http://localhost:4200. The app will automatically reload if you change any of the source files.

## Cloning

## Installing

In the root directory, execute `npm install`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

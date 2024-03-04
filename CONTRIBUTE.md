# Contributing

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/LinusBolls/code-university
```

### 2. Install dependencies

```bash
npm install
```

### 3. For testing

#### Important: Make sure you are using NodeJs v18 or newer for end-to-end testing, as the tests rely on the global fetch implementation

Most of our tests are end-to-end and interact with the production version of the CODE Learning Platform.
To be able to run these, please get an access token from the Learning Platform by following the instructions in `README.md`.
Create a file named `.env.testing` with contents matching `.env.testing.example`, and put your access token in it.

```bash
npm run test
```

### 4. Updating the Learning Platform graphql types

If the Learning Platform has undergone a schema change, simply run `npm run graphql:update-learning-platform-types`, and the two tools we use for code generation will automatically update the contents of the `src/graphql` directory.

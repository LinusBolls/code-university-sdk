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

Most of our tests are end-to-end and interact with the production version of the CODE Learning Platform.
To be able to run these, please get your google cookie from the Learning Platform by following the instructions in README.md.
Create a file named `.env.testing` with contents matching `.env.testing.example`, and put your google cookie in the created file.

```bash
npm run test
```

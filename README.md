### Gympass API (SOLID and TDD) ⚙️

A Restful API developed in Typescript, with the aim of providing similar functionality to the Gympass app. This API was built following SOLID principles and adopting the test-driven development (TDD) methodology, thus ensuring modular, scalable and highly testable code.

🚧 This repository is under development 🚧

### Functionalities 🔧

- User Registration: Allows new users to register on the platform.
- Gym registration: Allows the registration, updating and deletion of partner gyms. (Only by administrators)
- Check-in: Users can check-in daily at partner gyms.
- Metrics: it is possible to retrieve a user's check-in history and some other data.

### Techs and details 🧬

Currently working with: 

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Node.js](https://nodejs.org/en/)
- [Prisma](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org/)
- [Vitest](https://vitest.dev/)
- [JWT](https://jwt.io/introduction)
- [Docker](https://www.docker.com/#build)
- [Fastify](https://fastify.dev/)
- [NPM](https://docs.npmjs.com/)
- [Zod](https://zod.dev/)

### Running Server 💻

1 - Clone this repository
```bash
$ git clone https://github.com/orafaelmiguel/visity-backend.git
```

2 - Install the dependencies
```bash
$ npm install
```

3 - Create a .env file at the root of the project and enter the following command:
```bash
$ NODE_ENV=dev
```

4 - Run the application in development mode
```bash
$ npm run dev
```

The server will start on the port: 3333
Use software to test API functionalities such as Insomnia or Postman.

### Contributing 🏗

This repository is currently under development. If you want to contribute please fork the repository and get your hands dirty, and make the changes as you'd like and submit the Pull request.

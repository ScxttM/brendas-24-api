# Brenda's 24th API

This project has been developed to celebrate the 24th birthday of my beloved girlfriend Brenda.

## Description

Brenda's 24th API is a backend application designed to manage a leaderboard in real-time using a Web Socket.

## Installation

Follow these steps to install and run the project:

1. Clone the repository to your local machine.
    ```bash
    git clone https://github.com/ScxttM/brendas-24-api.git
    ```
2. Navigate to the project directory.
    ```bash
    cd brendas-24-api
    ```
3. Install the necessary dependencies.
    ```bash
    npm install
    ```
4. Start the server.
    ```bash
    npm run start
    ```

## Dependencies

The project uses the following dependencies:

- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.21.0
- **mysql2**: ^3.11.3
- **ws**: ^8.18.0
- **zod**: ^3.23.8

## Environment Variables

The following environment variables are required to run the project:

- `NODE_ENV`: The environment in which the application is running (e.g., development, production).
- `PORT`: The port on which the server will run.
- `DB_HOST`: The database host address.
- `DB_USER`: The database username.
- `DB_PASSWORD`: The database password.
- `JWT_SECRET`: The secret key for signing JSON Web Tokens.

Create a `.env` file in the root directory of the project and add the following lines with your specific values:

```plaintext
NODE_ENV=your_environment
PORT=your_port
WS_PORT=your_ws_port
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

## Usage

After following the installation steps, the server will be running, and you can make requests to the defined endpoints in the project. Make sure to configure the necessary environment variables as shown above.

## License

This project is licensed under the MIT License.

---

If you have any questions or need more information, feel free to contact me.

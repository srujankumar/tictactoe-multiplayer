Tic Tac Toe
======================


## Running
There are two components that need to be started in order to run the game.
1. Server
2. UI/Client

### Development/local
The server can be started using:
```
npm run server
```
There are 3 [koa](https://koajs.com/) apps that bind on the respective ports:

| Application | Description | Environment Variable | Default |
|-------------|-------------------------------------------------------------------|----------------------|---------|
| Server | The game server for boardgame, exposes socket.io endpoints | `SERVER_PORT` | 8000 |
| Lobby API | Internal API for lobby operations, should not be exposed publicly | `INTERNAL_API_PORT` | 8002 |
| Public API | Public API to create games and retrieve game info | `API_PORT` | 8001 |

The UI can be started using:
```
npm run start
```
The UI can also be built and served statically, keep in mind that the values of the port numbers will be hard coded in the generated files.


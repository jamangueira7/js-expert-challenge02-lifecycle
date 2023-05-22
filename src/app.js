const http = require('http');
const Api = require('./util/api');

const YoutubeRepository = require("./repository/youtubeRepository.js")
const SpotifyRepository = require("./repository/spotifyRepository.js")

const YoutubeService = require("./service/youtubeService.js")
const SpotifyService = require("./service/spotifyService.js")

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};
const DEFAULT_PORT = 3000;

const createService = () => {
  const api = new Api();
  const youtubeRepository = new YoutubeRepository({ api: api });
  const spotifyRepository = new SpotifyRepository({ api: api });

  return {
    YoutubeService: new YoutubeService({ repository: youtubeRepository }),
    SpotifyService: new SpotifyService({ repository: spotifyRepository }),
  }
}

class App {
  constructor(dependencies = createService()) {
    this.youtubeService = dependencies.YoutubeService;
    this.spotifyService = dependencies.SpotifyService;
  }

  createRoutes() {
    return {
      default: (request, response) => {
        response.writeHeader(404, DEFAULT_HEADERS);
        response.write(JSON.stringify({ msg: "404 - Essa rota não existe. Tente /youtube ou /spotify" }));
        return response.end();
      },
      "/youtube:get": async (request, response) => {
        const musics = await this.youtubeService.getAllMusicsYoutube();
        response.write(JSON.stringify(musics));
        return response.end();
      },
      "/spotify:get": async (request, response) => {
        const musics = await this.spotifyService.getAllMusicsSpotify();
        response.write(JSON.stringify(musics));
        return response.end();
      },
    };
  }

  handler(request, response) {
    const { url, method } = request;
    const routeKey = `${url}:${method.toLowerCase()}`;

    const routes = this.createRoutes();
    const chosen = routes[routeKey] || routes.default;

    response.writeHeader(200, DEFAULT_HEADERS);

    return chosen(request, response);
  }

  createServer(port = DEFAULT_PORT) {
    const app = http
      .createServer(this.handler.bind(this))
      .listen(port, () => console.log(`Listening on ${port}`));

    return app;
  }
}

module.exports = App;
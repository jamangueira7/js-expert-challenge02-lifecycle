const Playlist = require("../entities/playlist");
class SpotifyService {
    constructor({repository}) {
        this.repository = repository;
    }

    async getAllMusicsSpotify() {
        const musics = await this.repository.getAllMusics();
        const playlist = new Playlist({ musics });

        return playlist.toResponse();
    }
}

module.exports = SpotifyService;
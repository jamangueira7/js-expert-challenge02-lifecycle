const Playlist = require("../entities/playlist");

class YoutubeService {
    constructor({repository}) {
        this.repository = repository;
    }

    async getAllMusicsYoutube() {
        const musics = await this.repository.getAllMusics();
        const playlist = new Playlist({ musics });

        return playlist.toResponse();
    }
}

module.exports = YoutubeService;


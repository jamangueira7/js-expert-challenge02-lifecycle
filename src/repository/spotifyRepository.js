const SpotifyMusic = require("../entities/spotifyMusic.js");
const MusicDTO = require("../entities/musicDTO");

class SpotifyRepository {
    constructor({ api }) {
        this.api = api;
    }

    async getAllMusics() {
        const allMusics = await this.api.get('spotify');

        return allMusics
            .map(this.dataTransform)
            .map(music => new SpotifyMusic(music));
    }

    dataTransform = (music) => new MusicDTO(music);
}

module.exports = SpotifyRepository;
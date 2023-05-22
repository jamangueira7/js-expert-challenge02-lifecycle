const YoutubeMusic = require("../entities/youtubeMusic.js");
const MusicDTO = require("../entities/musicDTO");


class YoutubeRepository {
    constructor({ api }) {
        this.api = api;
    }

    async getAllMusics() {
        const allMusics = await this.api.get('youtube');

        return allMusics
            .map(this.dataTransform)
            .map((music) => new YoutubeMusic(music));
    }

    dataTransform = (music) => new MusicDTO(music);
}

module.exports = YoutubeRepository;
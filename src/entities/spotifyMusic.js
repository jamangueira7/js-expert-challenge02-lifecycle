const Music = require("./music.js");

class SpotifyMusic extends Music {
    constructor({...musicProps}) {
        super((musicProps));
    }

    [Symbol.toPrimitive](coercionType){
        return coercionType === "string"
            ? `${this.music_name} - ${this.album_name} - ${this.artist_name}`
            : this.duration
    }
}

module.exports = SpotifyMusic;
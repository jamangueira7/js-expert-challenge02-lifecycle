const {
    describe,
    it,
    before,
    beforeEach,
    afterEach
} = require('mocha');
const sinon = require('sinon');
const { join } = require('path');
const { expect } = require('chai');
const Api = require('./../../src/util/api');
const SpotifyMusic = require("../../src/entities/spotifyMusic");
const MusicDTO = require("../../src/entities/musicDTO");

const mocks = {
    allSpotifyMusic: require("../mocks/spotify/allmusics.json"),
    allSpotifyMusicRepository: require("../mocks/spotify/allMusicsRepository.json"),
    allSpotifyMusicApi: require("../mocks/spotify/allMusicByApiGet.json"),
    oneSpotifyMusicApi: require("../mocks/spotify/oneMusicByApiGet.json"),
}

const SpotifyRepository = require('./../../src/repository/spotifyRepository');

const api = new Api();
spotifyRepository = new SpotifyRepository({ api: api });

const mockRepository = mocks.allSpotifyMusicApi
    .map((item) => new MusicDTO(item))
    .map((music) => new SpotifyMusic(music))

const mockApi = sinon.stub(api, 'get');
mockApi.resolves(mocks.allSpotifyMusicApi);

describe('SpotifyRepositoryTest Suite Tests', () => {

    let sandbox = {};
    let spotifyRepository = {};

    before(() => {
        spotifyRepository = new SpotifyRepository({ api: api });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all musics', async () => {
        const expected = mockRepository;
        const result = await spotifyRepository.getAllMusics();
        expect(result).to.eql(expected);
    });

    it("should return an instance of MusicDTO", () => {
        const result = spotifyRepository.dataTransform(mocks.oneSpotifyMusicApi);

        expect(result).instanceof(MusicDTO);
    })
});
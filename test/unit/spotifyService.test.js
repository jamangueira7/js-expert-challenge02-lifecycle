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
    allSpotifyMusicRepository: require("../mocks/spotify/allMusicsRepository.json")
}


const SpotifyServiceTest = require('./../../src/service/spotifyService');
const SpotifyRepository = require('./../../src/repository/spotifyRepository');

const api = new Api();
spotifyRepository = new SpotifyRepository({ api: api });

const mockRepository = mocks.allSpotifyMusicRepository
    .map((item) => new MusicDTO(item))
    .map((music) => new SpotifyMusic(music))

const mockRepositoryGetAll = sinon.stub(spotifyRepository, 'getAllMusics');
mockRepositoryGetAll.resolves(mockRepository);

describe('SpotifyServiceTest Suite Tests', () => {

    let spotifyService = {};
    let sandbox = {};

    before(() => {
        spotifyService = new SpotifyServiceTest({
            repository: spotifyRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all musics', async () => {
        const expected = mocks.allSpotifyMusic;
        const result = await spotifyService.getAllMusicsSpotify();
        expect(result).to.eql(expected);
    });
});
const {
    describe,
    it,
    before,
    beforeEach,
    afterEach
} = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const Api = require('./../../src/util/api');

const mocks = {
    allSpotifyMusic: require("../mocks/spotify/allmusics.json"),
    allSpotifyMusicRepository: require("../mocks/spotify/allMusicsRepository.json"),
    allSpotifyMusicApi: require("../mocks/spotify/allMusicByApiGet.json"),
}


const SpotifyService = require('./../../src/service/spotifyService');
const SpotifyRepository = require('./../../src/repository/spotifyRepository');

const api = new Api();
spotifyRepository = new SpotifyRepository({ api: api });

const mockApi = sinon.stub(api, 'get');
mockApi.resolves(mocks.allSpotifyMusicApi);

describe('SpotifyServiceTest Suite Tests', () => {

    let spotifyService = {};
    let sandbox = {};

    before(() => {
        spotifyService = new SpotifyService({
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
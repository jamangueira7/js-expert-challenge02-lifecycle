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
const YoutubeMusic = require("../../src/entities/youtubeMusic");
const MusicDTO = require("../../src/entities/musicDTO");

const mocks = {
    allYoutubeMusic: require("../mocks/youtube/allmusics.json"),
    allYoutubeMusicRepository: require("../mocks/youtube/allMusicsRepository.json"),
    allYoutubeMusicApi: require("../mocks/youtube/allMusicByApiGet.json"),
    oneYoutubeMusicApi: require("../mocks/youtube/oneMusicByApiGet.json"),
}

const YoutubeRepository = require('./../../src/repository/youtubeRepository');

const api = new Api();
youtubeRepository = new YoutubeRepository({ api: api });

const mockRepository = mocks.allYoutubeMusicApi
    .map((item) => new MusicDTO(item))
    .map((music) => new YoutubeMusic(music))

const mockApi = sinon.stub(api, 'get');
mockApi.resolves(mocks.allYoutubeMusicApi);

describe('YoutubeRepositoryTest Suite Tests', () => {

    let sandbox = {};
    let youtubeRepository = {};

    before(() => {
        youtubeRepository = new YoutubeRepository({ api: api });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all musics', async () => {
        const expected = mockRepository;
        const result = await youtubeRepository.getAllMusics();
        expect(result).to.eql(expected);
    });

    it("should return an instance of MusicDTO", () => {
        const result = youtubeRepository.dataTransform(mocks.oneYoutubeMusicApi);

        expect(result).instanceof(MusicDTO);
    })
});
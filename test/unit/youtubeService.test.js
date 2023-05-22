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
    allYoutubeMusicRepository: require("../mocks/youtube/allMusicsRepository.json")
}


const YoutubeServiceTest = require('./../../src/service/youtubeService');
const YoutubeRepository = require('./../../src/repository/youtubeRepository');

const api = new Api();
youtubeRepository = new YoutubeRepository({ api: api });

const mockRepository = mocks.allYoutubeMusicRepository
    .map((item) => new MusicDTO(item))
    .map((music) => new YoutubeMusic(music))

const mockRepositoryGetAll = sinon.stub(youtubeRepository, 'getAllMusics');
mockRepositoryGetAll.resolves(mockRepository);

describe('YoutubeServiceTest Suite Tests', () => {

    let youtubeService = {};
    let sandbox = {};

    before(() => {
        youtubeService = new YoutubeServiceTest({
            repository: youtubeRepository
        });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return all musics', async () => {
        const expected = mocks.allYoutubeMusic;
        const result = await youtubeService.getAllMusicsYoutube();
        expect(result).to.eql(expected);
    });
});
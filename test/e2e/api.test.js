const { describe, it, beforeEach, afterEach } = require('mocha');
const request = require('supertest');
const assert = require('assert');
const { expect } = require("chai");
const sinon = require("sinon");
const http = require("http");
const { join } = require('path');
const { writeFile } = require('fs/promises');

const App = require('../../src/app');

const SERVER_TEST_PORT = 3002;

const mocks = {
    allYoutubeMusic: require("../mocks/youtube/allmusics.json"),
    allSpotifyMusic: require("../mocks/spotify/allmusics.json"),
}

describe("API Suite test", () => {
    let api = {};
    let sandbox = sinon.createSandbox();

    beforeEach( async() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("Connection", () => {
        it("should start with server 3000", () => {
            const api = new App();

            sandbox.spy(api);
            sandbox.stub(http, http.createServer.name).returns({
                listen: (port, callback) => {}
            });

            api.createServer();

            expect(api.createServer.getCall(0).args[0]).to.be.equal(undefined);
        });

        it("should start the server on createServer method", () => {
            const api = new App();
            const portTest = 6000;

            sandbox.spy(api);
            sandbox.stub(http, http.createServer.name).returns({
                listen: (port, callback) => {}
            });

            api.createServer(portTest);

            expect(http.createServer.callCount).to.be.equal(1);
            expect(api.createServer.getCall(0).args[0]).to.be.equal(portTest);
        });
    });

    describe("/Routes", () => {
        before(() => {
            const instance = new App();

            api = {
                instance,
                server: instance.createServer(SERVER_TEST_PORT),
            };
        });

        describe("/Default - 404", () => {
            it('request default routes return status 404', async () => {
                await request(api.server)
                    .get('/')
                    .expect(404);
            });

            it('request default routes return default test', async () => {
                const expected = { msg: '404 - Essa rota não existe. Tente /youtube ou /spotify' };

                await request(api.server)
                    .get('/')
                    .expect(expected);
            });
        });

        describe('/youtube', () => {

            it('request all', async () => {
                const expected = {
                    allYoutubeMusic: mocks.allYoutubeMusic
                };

                await request(api.server)
                    .get(`/youtube`)
                    .expect(expected.allYoutubeMusic);

            });
        });

        describe('/spotify', () => {

            it('request all', async () => {
                const expected = {
                    allSpotifyMusic: mocks.allSpotifyMusic
                };

                await request(api.server)
                    .get(`/spotify`)
                    .expect(expected.allSpotifyMusic);

            });
        });
    });
});
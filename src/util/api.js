class Api {
    async get(param) {
        const jsonResponse = await fetch(`http://localhost:3001/${param}`);
        const { tracks } = await jsonResponse.json();
        return tracks.items;
    }
}

module.exports = Api;
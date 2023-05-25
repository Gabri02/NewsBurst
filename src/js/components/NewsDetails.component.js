function NewsDetails() {
    async function getNewsDetails(id) {
    const apiUrl = process.env.API_URL;
    try {
        const response = await axios.get(`${apiUrl}/item/${id}.json`);
        return response.data;
    } catch (error) {
        console.error(`Errore durante il recupero dei dettagli della notizia con ID ${id}:`, error);
        return null;
    }
}
}

module.exports = {NewsDetails};
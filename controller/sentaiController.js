const path = require('path')
const fs = require('fs')

seasonsSentai = path.join(__dirname, '../persistence/seasonsSentai.json')

let sentai = []
try {
    const data = fs.readFileSync(seasonsSentai, 'utf8')
    if (data.trim() !== '') {
        const jsonData = JSON.parse(data)
        sentai = jsonData
        console.log(sentai)
    } else {
        console.log(`El archivo ${seasonsSentai} está vacío`);

    }
} catch (error) {
    console.log(`Error al parcear el archivo JSON ${seasonsSentai}`, error);

}

const saveSentaiToFile = () => {
    try {
        fs.writeFileSync(seasonsSentai, JSON.stringify(sentai, null, 2), 'utf8');
    } catch (error) {
        console.log(`Error al escribir el archivo JSON ${seasonsSentai}`, error);
    }
}

module.exports = {
    findAll: async (req, res) => {
        try {
            return res.status(200).json({ "state": true, "sentai": sentai })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    findById: async (req, res) => {
        const { id } = req.params
        const index = parseInt(id, 10)

        try {
            if (isNaN(index) || index < 0 || index >= sentai.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            return res.status(200).json({ "state": true, "sentai": sentai[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    updateEpisode: async (req, res) => {
        const { id } = req.params
        const { episode } = req.body
        index = parseInt(id)
        try {
            if (isNaN(index) || index < 0 || index >= sentai.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            sentai[index].view = episode
            saveSentaiToFile()
            return res.status(200).json({ "state": true, "sentai": sentai[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    }
}
const path = require('path')
const fs = require('fs')

seasonsRanger = path.join(__dirname, '../persistence/seasonsRangers.json')

let ranger = []
try {
    const data = fs.readFileSync(seasonsRanger, 'utf8')
    if (data.trim() !== '') {
        const jsonData = JSON.parse(data)
        ranger = jsonData
    } else {
        console.log(`El archivo ${seasonsRanger} está vacío`);

    }
} catch (error) {
    console.log(`Error al parcear el archivo JSON ${seasonsRanger}`, error);

}

const saveRangerToFile = () => {
    try {
        fs.writeFileSync(seasonsRanger, JSON.stringify(ranger, null, 2), 'utf8');
    } catch (error) {
        console.log(`Error al escribir el archivo JSON ${seasonsRanger}`, error);
    }
}

module.exports = {
    findAll: async (req, res) => {
        try {
            return res.status(200).json({ "state": true, "ranger": ranger })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    findById: async (req, res) => {
        const { id } = req.params
        const index = parseInt(id, 10)

        try {
            if (isNaN(index) || index < 0 || index >= ranger.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            return res.status(200).json({ "state": true, "ranger": ranger[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    updateEpisode: async (req, res) => {
        const { id } = req.params
        const { episode } = req.body
        index = parseInt(id)
        try {
            if (isNaN(index) || index < 0 || index >= ranger.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            ranger[index].view = episode
            saveRangerToFile()
            return res.status(200).json({ "state": true, "ranger": ranger[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    }
}
const path = require('path')
const fs = require('fs')

seasonsKamen = path.join(__dirname, '../persistence/seasonsKamen.json')

let kamen = []
try {
    const data = fs.readFileSync(seasonsKamen, 'utf8')
    if (data.trim() !== '') {
        const jsonData = JSON.parse(data)
        kamen = jsonData
    } else {
        console.log(`El archivo ${seasonsKamen} está vacío`);

    }
} catch (error) {
    console.log(`Error al parcear el archivo JSON ${seasonsKamen}`, error);

}

const saveKamenToFile = () => {
    try {
        fs.writeFileSync(seasonsKamen, JSON.stringify(kamen, null, 2), 'utf8');
    } catch (error) {
        console.log(`Error al escribir el archivo JSON ${seasonsKamen}`, error);
    }
}

module.exports = {
    findAll: async (req, res) => {
        try {
            return res.status(200).json({ "state": true, "kamen": kamen })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    findById: async (req, res) => {
        const { id } = req.params
        const index = parseInt(id, 10)

        try {
            if (isNaN(index) || index < 0 || index >= kamen.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            return res.status(200).json({ "state": true, "kamen": kamen[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    },
    updateEpisode: async (req, res) => {
        const { id } = req.params
        const { episode } = req.body
        index = parseInt(id)
        try {
            if (isNaN(index) || index < 0 || index >= kamen.length) {
                return res.status(404).json({ "state": false, "error": "Elemento no encontrado" })
            }
            kamen[index].view = episode
            saveKamenToFile()
            return res.status(200).json({ "state": true, "kamen": kamen[index] })
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error.message })
        }
    }
}
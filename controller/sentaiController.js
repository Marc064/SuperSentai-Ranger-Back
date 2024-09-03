const path = require('path')
const fs = require('fs')

seasonsSentai = path.join(__dirname, '../persistence/seasonsSentai.json')

module.exports ={
    findAll: async(req, res)=>{
        try {
            let sentai = new Map()
            try{
                const data = fs.readFileSync(seasonsSentai, 'utf8')
            } catch (error) {
                return res.status(500).json({"state": false, "error": error})
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": error})
        }
    }
}
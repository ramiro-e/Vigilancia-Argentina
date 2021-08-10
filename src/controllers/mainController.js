const path = require('path');
const fs = require("fs")

module.exports = {
    index: (req,res)=>{
        res.render(path.resolve(__dirname, '../views/main/index'), {
            styles: ["header.css","index.css","footer.css"],
            title: "Vigilancia Argentina",
            slider: fs.readdirSync(path.resolve(__dirname, '../../public/images/web/sliderHeader')),
            productos: ["producto","producto","producto","producto"]
        })
    }
}
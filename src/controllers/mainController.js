const path = require('path');

module.exports = {
    index: (req,res)=>{
        res.render(path.resolve(__dirname, '../views/main/index'), {
            styles: ["header.css","index.css","footer.css"],
            title: "Vigilancia Argentina"
        })
    }
}
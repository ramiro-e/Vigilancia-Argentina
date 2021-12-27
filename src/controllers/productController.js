const path = require('path');
const db = require('../database/models');
const {validationResult} = require('express-validator')
const Products = db.Product;
const Categories = db.Category;


const ProductControllers = {

    detail: (req, res) => {
        Products.findByPk(req.params.id,{
            include: ["category"]
        })
        .then ((product)=>{
            let specsheet = {'Camara': {'Gama':	'Easy','Sensor de imagen':	'1/3" Progressive Scan CMOS','Resolución máxima': '4 Megapixel (2688×1520)'},'Camara1': {'Gama3':	'Easy','Sensor de imagen':	'1/3" Progressive Scan CMOS','Resolución máxima': '4 Megapixel (2688×1520)'},'Camara2': {'Gama4':	'Easy','Sensor de imagen':	'1/3" Progressive Scan CMOS','Resolución máxima': '4 Megapixel (2688×1520)'}}
            let features = ['Uniview','Cámara Bullet IP','Gama Easy','1/3" Progressive Scan CMOS','4 Megapixel (2688x1520)','Lente 2.8 mm','0 Lux','IR Alcance 30 m','True WDR 120dB','Micrófono integrado','Ranura para tarjeta MicroSD (hasta 256GB)','Compresión Ultra265/H.265/H.264','PoE IEEE802.3af','Impermeable (IP67), Protección contra sobretensiones','Interfaz WEB, CMS, Smartphone y NVR','Compatible con ONVIF']
            let alldownloads = {'specsheet': [{'name':'Ficha en HTML KASLBCAS LAKSBC ASC AS AS CAS CASJVKN J LH HJ,HJB LUB BK B HB', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}, {'name':'Ficha en PDF', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}, {'name':'Ficha del fabricante', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}],'resources': [{'name':'Ficha en HTML KASLBCAS LAKSBC ASC AS AS CAS CASJVKN J LH HJ,HJB LUB BK B HB', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}, {'name':'Ficha en PDF', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}, {'name':'Ficha del fabricante', 'language':'ES', 'type':'PDF', 'size': '60 MB','link': 'https://s3-eu-west-1.amazonaws.com/files.visiotech.es/files/pdf/UV-IPC2124LE-ADF28KM-G_ES.pdf'}]}
            res.render(path.resolve(__dirname, '../views/products/detail'), {
                product,
                specsheet,
                features,
                alldownloads,
                images: JSON.parse(product.image),
                title: "Detalle | " + product.name
            })
        })
        .catch(error => res.send(error))
    }
}
module.exports = ProductControllers;
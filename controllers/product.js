const formidable = require('formidable')
const _ = require("lodash")
const fs = require('fs')
const Product = require('../models/product')
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {

            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        // check for all form fields
        const {name, description, price, category, quantity, shipping, date, time, address, clubname} = fields
        if(!name || !description ||!price || !category || !quantity || !shipping || !date || !time || !address || !clubname) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }
        let product = new Product(fields)

        if(files.photo){
            //console.log('FILES PHOTO: ', files.photo)
            if(files.photo.size > 2000000) {
                return res.status(400).json({
                    error: "Image should be less than 2mb in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })

    })

}

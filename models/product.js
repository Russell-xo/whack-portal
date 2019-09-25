const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 80
        },
        description: {
            type: String,
            required: true,
            maxlength: 9999
        }, 
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        }, 
        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
            maxlength: 80
        }, 
        quantity: {
            type: Number,
            
        },

        sold: {
            type: Number,
            default: 0
            
        },
        date: {
            type: String,
            
        },
        time: {
            type: String,
        },
        address: {
            type: String,
        
        },
        clubname: {
            type: String,
            
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
            required: false,
            type: Boolean
        }   
    }, 
    {timestamps: true}
);


module.exports = mongoose.model("Product", productSchema);
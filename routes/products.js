const express = require('express');
const router = express.Router();
const {Products} = require('../models');
const validator = require("fastest-validator");
const products = require('../models/products');
const v = new validator();
const verify = require('../middleware/verify');

router.get("/", verify, async function(req,res,next){
    // res.send("Belajar Node JS");
    let products = await Products.findAll();

    return res.status(200).json({
        status: 200, 
        message: "Muncul semua nya",
        data: products
    });
});

router.get("/:id", async function(req,res,next){
    const id = req.params.id;
    let product = await Products.findByPk(id);
    if (!product){
        return res.status(404).json({
            status: 404,
            message: "Product entah dimana."
        })
    }
    
    return res.status(200).json({
        status: 200, 
        message: "Muncul product nya",
        data: product
    });
});

router.put("/:id", async function(req,res,next){
    const id = req.params.id;
    let product = await Products.findByPk(id);
    if (!product){
        return res.status(404).json({
            status: 404,
            message: "Product entah dimana."
        })
    }

    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);
    if (validate.length){
        return res.status(400).json(validate);
    }

    product = await product.update(req.body);
    
    return res.status(200).json({
        status: 200, 
        message: "Berubah product nya",
        data: product
    });
});

router.delete("/:id", async function(req,res,next){
    const id = req.params.id;
    let product = await Products.findByPk(id);
    if (!product){
        return res.status(404).json({
            status: 404,
            message: "Product entah dimana."
        })
    }

    product = await product.destroy();
    
    return res.status(200).json({
        status: 200, 
        message: "Udah gak ada product nya"
    });
});

router.get("/all", function(req,res,next){
    res.send("Belajar Node JS semua");
});

router.post("/create", async function(req, res, next){
    const schema = {
        name: "string",
        price: "number",
        image: "string|optional"
    }

    const validate = v.validate(req.body, schema);
    if (validate.length){
        return res.status(400).json(validate);
    }

    const product = await Products.create(req.body);

    return res.status(201).json({
        status: 201, 
        message: "Success Create Products",
        data: product
    });
});

// router.post("/create", async function(req , res, next){    
//     const schema = {
//         name: "string",
//         price: "number",
//         image: "string|optional"
//     }

//     const validate = v.validate(req.body, schema);
//     if(validate.length){
//         return res.status(422).json(validate);
//     }

//     const products = await Products.create(req.body);
//     return res.json({
//         status: 200,
//         message: "Success Create Products",
//         data: products
//     });
// });


module.exports = router;
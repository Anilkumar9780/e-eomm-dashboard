const express = require('express');
const cors = require("cors");
const app = express();

//config component
require('./db/config');

//components
const User = require('./db/User');
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const jwtkey = 'e-commerce';

app.use(express.json());
app.use(cors());

// register user route (signup)
app.post('/signup',  async (request, response) => {
    let user = new User(request.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
            response.send({ result: "Something went wrong, Please try after sometime " })
        }
        response.send({ result, auth: token });
    })

});

// login user route (login)
app.post('/login',async (request, response) => {
    if (request.body.password && request.body.email) {
        let user = await User.findOne(request.body).select('-password');
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    response.send({ result: "Something went wrong, Please try after sometime " })
                }
                response.send({ user, auth: token });
            })
        } else {
            response.send({ result: "No User Found" })
        }
    } else {
        response.send({ result: "No User Found" })
    }
});

// user add product  route
app.post('/add-product', verifyToken, async (request, response) => {
    let product = new Product(request.body);
    let result = await product.save();
    response.send(result);
});

//get user by all products route
app.get("/products", verifyToken, async (request, response) => {
    let products = await Product.find();
    if (products.length > 0) {
        response.send(products);
    } else {
        response.send({ result: "No Product Found" })
    }
});

// delete product route
app.delete("/product/:id", verifyToken, async (request, response) => {
    const result = await Product.deleteOne({ _id: request.params.id });
    response.send(result)
})

//edit product route
app.get("/product/:id", verifyToken, async (request, response) => {
    const result = await Product.findOne({ _id: request.params.id });
    if (result) {
        response.send(result);
    } else {
        response.send({ result: "No Record Found" })
    }
});

//update product route
app.put("/product/:id", verifyToken, async (request, response) => {
    let result = await Product.updateOne(
        { _id: request.params.id },
        {
            $set: request.body
        }
    )
    response.send(result);
});

//search product route
app.get("/search/:key", verifyToken, async (request, response) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: request.params.key } },
            { company: { $regex: request.params.key } },
            { category: { $regex: request.params.key } }
        ]
    });
    response.send(result);
})

// bearer verifyToken
// middeware function jwt token verify 
function verifyToken(request, response, next) {
    let token = request.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, jwtkey, (error, valid) => {
            if (error) {
                response.send({ result: "Please provide valid token" });
            } else {
                next();
            }
        })
    } else {
        response.send({ result: "Please add token with header" });
    }
};

//port server
var listener = app.listen(5000, () => {
    console.log('Listening on port ' + listener.address().port);
});
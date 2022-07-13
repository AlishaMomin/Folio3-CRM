const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid")

const idLength = 8;


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Product
 *         Name:
 *           type: string
 *           description: Product's name
 *         SKU:
 *           type: string
 *           description: Product's password

 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The Product managing API
 */


/**
 * @swagger
 * /Product:
 *   get:
 *     summary: Returns the list of all the Product
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: The list of the Product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: bad request
 */
router.get("/", (req, res) => {
    const Product = req.app.db.get("Product")
    res.send(Product);
});

/**
 * @swagger
 * /Product/{Name}:
 *   get:
 *     summary: Get the Product by Name
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: Name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Product email
 *     responses:
 *       200:
 *         description: The Product description by Name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The Product was not found
 */

router.get("/:Name", (req, res) => {

    const Product = req.app.db.get("Product").find({ Name: req.params.Name }).value()
    res.send(Product);
});


/**
 * @swagger
 * /Product:
 *   post:
 *     summary: Create a new Product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The Product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    try {
        const Product = {
            id: nanoid(idLength),
            Name: nanoid(100),
            SKU: nanoid(24),
            ...req.body,
        };

        req.app.db.get("Product").push(Product).write();

        res.send("New Product is added");
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;



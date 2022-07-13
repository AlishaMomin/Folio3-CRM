// get -> unsettle amount, all transaction 


const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid")

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Order
 *         Totalamount:
 *           type: number
 *           description: Order's name
 *         Dateoforder:
 *           type: string
 *           description: Order's contact no
 *         Lastdate:
 *           type: string
 *           description: Order's password
 *         Transactiontype:
 *           type: string
 *           description: Order's password
 *         Referenceno:
 *           type: integer
 *           description: Order's password
 *         Name:
 *           type: string
 *           description: Order's password
 *         Invoicestatus:
 *           type: string
 *           description: Order's password

 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: The Order managing API
 */


/**
 * @swagger
 * /Order:
 *   get:
 *     summary: Returns the list of all the Order
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the Order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: bad request
 */
router.get("/", (req, res) => {
    const Order = req.app.db.get("Order")
    res.send(Order);
});
module.exports = router;
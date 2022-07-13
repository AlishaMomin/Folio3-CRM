const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid")

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         RoleName:
 *           type: string
 *           description: Role's name

 */

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: The Role managing API
 */


/**
 * @swagger
 * /Role:
 *   get:
 *     summary: Returns the list of all the Role
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: The list of the Role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       400:
 *         description: bad request
 */
router.get("/", (req, res) => {
    const Role = req.app.db.get("Role")
    res.send(Role);
});

/**
 * @swagger
 * /Role/{id}:
 *   get:
 *     summary: Get the Role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The Role email
 *     responses:
 *       200:
 *         description: The Role description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: The Role was not found
 */

router.get("/:id", (req, res) => {

    const Role = req.app.db.get("Role").find({ id: req.params.id }).value()
    res.send(Role);
});

module.exports = router;
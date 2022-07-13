const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid")

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the User
 *         Name:
 *           type: string
 *           description: User's name
 *         ContactNo:
 *           type: string
 *           description: User's contact no
 *         Email:
 *           type: string
 *           description: User's email 
 *         Password:
 *           type: string
 *           description: User's password

 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */


/**
 * @swagger
 * /User:
 *   get:
 *     summary: Returns the list of all the User
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the User
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: bad request
 */
router.get("/", (req, res) => {
    const User = req.app.db.get("User")
    res.send(User);
});

/**
 * @swagger
 * /User/{Name}:
 *   get:
 *     summary: Get the User by Name
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: Name
 *         schema:
 *           type: string
 *         required: false
 *         description: The User email
 *     responses:
 *       200:
 *         description: The User description by Name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 */

router.get("/:Name", (req, res) => {

    const User = req.app.db.get("User").find({ Name: req.params.Name }).value()
    res.send(User);
});

/**
 * @swagger
 * /User:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    try {
        const User = {
            id: nanoid(idLength),
            Name: nanoid(100),
            ContactNo: nanoid(11),
            Email: nanoid(64),
            Password: nanoid(24),
            ...req.body,
        };

        req.app.db.get("User").push(User).write();

        res.send("New User is added");
    } catch (error) {
        return res.status(500).send(error);
    }
});


/**
 * @swagger
 * /User/{id}:
 *  put:
 *    summary: Update the User by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The User id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The User was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The User was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("User")
            .find({ id: req.params.id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("User").find({ id: req.params.id }));
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;
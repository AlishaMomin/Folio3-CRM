// put https

const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid")

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Company
 *         Name:
 *           type: string
 *           description: Company's name
 *         Type:
 *           type: string
 *           description: Company's contact no
 *         HostCompanyID:
 *           type: integer
 *           description: Company's password

 */

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: The Company managing API
 */


/**
 * @swagger
 * /Company:
 *   get:
 *     summary: Returns the list of all the Company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: The list of the Company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       400:
 *         description: bad request
 */
router.get("/", (req, res) => {
    const Company = req.app.db.get("Company")
    res.send(Company);
});



/**
 * @swagger
 * /Company/{Name}:
 *   get:
 *     summary: Get the Company by Name
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: Name
 *         schema:
 *           type: string
 *         required: false
 *         description: The Company email
 *     responses:
 *       200:
 *         description: The Company description by Name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: The Company was not found
 */

router.get("/:Name", (req, res) => {

    const Company = req.app.db.get("Company").find({ Name: req.params.Name }).value()
    res.send(Company);
});


/**
 * @swagger
 * /Company:
 *   post:
 *     summary: Create a new Company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: The Company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
    try {
        const Company = {
            id: nanoid(idLength),
            Name: nanoid(100),
            Type: nanoid(11),
            HostCompanyID: nanoid(100),
            ...req.body,
        };

        req.app.db.get("Company").push(Company).write();

        res.send("New Company is added");
    } catch (error) {
        return res.status(500).send(error);
    }
});


/**
 * @swagger
 * /Company/{id}:
 *  put:
 *    summary: Update the Company by the id
 *    tags: [Company]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The Company id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Company'
 *    responses:
 *      200:
 *        description: The Company was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Company'
 *      404:
 *        description: The Company was not found
 *      500:
 *        description: Some error happened
 */

 router.put("/:id", (req, res) => {
    try {
        req.app.db
            .get("Company")
            .find({ id: req.params.id })
            .assign(req.body)
            .write();

        res.send(req.app.db.get("Company").find({ id: req.params.id }));
    } catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;
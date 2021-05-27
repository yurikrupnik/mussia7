import express, { Router } from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
// import * as swaggerJsdoc from "swagger-jsdoc";

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Hello World",
//             version: "1.0.0"
//         }
//     },
//     // apis: ["./src/routes*.js"] // files containing annotations as above
//     apis: ["./src/server.ts"] // files containing annotations as above
// };

// console.log("swaggerJsdoc", swaggerJsdoc);

// const openapiSpecification = swaggerJsdoc(options);
// console.log("openapiSpecification", openapiSpecification);

const app = express();

function api() {
    const route = Router();
    /**
     * @swagger
     * /:
     *   get:
     *     tags:
     *       - Service1
     *     name: Find Service1
     *     summary: Finds Service1 information
     *     security:
     *       - bearerAuth: []
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: A single project object
     *       401:
     *         description: No auth token
     */
    route.get("/", (req, res) => {
        res.status(200).json({
            message: "service 1 response"
        });
    });

    /**
     * @swagger
     * /{id}:
     *   get:
     *     tags:
     *       - Service1
     *     name: Find service1 by id
     *     summary: Finds billing information
     *     security:
     *       - bearerAuth: []
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required:
     *           - id
     *     responses:
     *       200:
     *         description: A single project object
     *       401:
     *         description: No auth token
     */
    route.get("/:id", (req, res) => {
        res.status(200).send(`ok from get ${req.params.id}`);
    });

    /**
     * @swagger
     * /:
     *   post:
     *     tags:
     *       - Service1
     *     name: Find service1 by id
     *     summary: Finds billing information
     *     security:
     *       - bearerAuth: []
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required:
     *           - id
     *     responses:
     *       200:
     *         description: A single project object
     *       401:
     *         description: No auth token
     */
    route.post("/", (req, res) => {
        res.status(200).send(`ok from post ${req.body}`);
    });

    route.delete("/:id", (req, res) => {
        res.status(200).send(`ok from delete ${req.params.id}`);
    });

    return route;
}

function swaggerUI(url: string) {
    // todo module
    const r = Router();
    r.get("/swagger", (req, res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "swagger.json"));
    });
    r.use("/doc", swaggerUi.serve);
    r.get(
        "/doc",
        swaggerUi.setup(
            {},
            {
                swaggerOptions: {
                    url: `${url}/swagger`
                }
            }
        )
    );
    return r;
}

// app.use(swaggerUI(`${host}:${port}`));
app.use((req, res, next) => {
    console.log("req.url", req.url);
    console.log("req.hostname", req.hostname);
    next();
    // swaggerUI(req.hostname);
});
app.use(swaggerUI("http://localhost:8080"));

app.use(api());
// const route = Router();
//
// const route = app.use((req, res) => {
//     res.json({
//         allGood: false
//     });
// });

// app.listen(5000);

export default app;

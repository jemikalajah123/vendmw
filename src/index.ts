import * as bodyParser from "body-parser"
import express, {Request, Response} from 'express'
import cors from 'cors';
import { createConnection } from "typeorm";;
import { APILogger } from "./logger/api.logger"
import { CharacterController } from "./controller/character"
import { EpisodeController } from "./controller/episode"
import { CommentController } from "./controller/comment"
import { Comment } from './entities/Comment'
import { Character } from './entities/Character'
import { Episode } from './entities/Episode'
import 'dotenv/config'


class App {

    public express: express.Application;
    public logger: APILogger;
    public episodeController: EpisodeController;
    public characterController: CharacterController;
    public commentController: CommentController;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.characterController = new CharacterController()
        this.episodeController = new EpisodeController();
        this.commentController = new CommentController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }))
    }

    private async routes() {
        const port = parseInt(process.env.DB_PORT || "5432")
        const hostName = process.env.DB_HOST || ""
        const userName = process.env.DB_USER || ""
        const password = process.env.DB_PASSWORD
        const database = process.env.DB_NAME || ""
	try {
		await createConnection({
			type: 'postgres',
			host: hostName,
			port: port,
			username: userName,
			password: password,
			database: database,
			ssl: {
				rejectUnauthorized: false,
			},			
			entities: [Comment, Character,Episode],
			synchronize: true,
		})
		console.log('Connected to Postgres')

        this.express.use(cors());
		this.express.listen(process.env.PORT || 5000, () => {
			console.log('Now running on port 5000')
		})
	} catch (error) {
		console.error(error)
		throw new Error('Unable to connect to db')
	}
    this.commentController = new CommentController();
    this.episodeController = new EpisodeController();
    this.characterController = new CharacterController();


    this.express.use(`/api/characters`,this.characterController.router);
    this.express.use(`/api/comments`,this.commentController.router);
    this.express.use(`/api/episodes`,this.episodeController.router);
    this.express.use(`/api/list`,this.characterController.router);
        
    //default route
    this.express.get("/", (req: Request, res: Response ) => {
        res.send("Typescript App works!!");
    });

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
        res.send("Make sure url is correct!!!");
    });
    }
}

export default new App().express;
import * as http from "http";
import App from "./index";
import { APILogger } from "./logger/api.logger";


const port = process.env.PORT || 5000;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new APILogger();

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr && addr.port}`;
    logger.info(`Listening on ${bind}`, null);
 });

module.exports = App;
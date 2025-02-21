import morgan from "morgan";
import logger from "../config/logger.js";

const morganMiddleware = morgan("combined", {
  stream: {
    write: (message) => {
      logger.info(message.trim()); // Logger la requête HTTP avec winston
    },
  },
});

export default morganMiddleware;

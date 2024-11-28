const path = require('path');
const fs = require('fs');
const logger =require ('../utils/logger')

const loadRoutes = (baseDir = __dirname) => {
  logger.info("Initialisation des routes");

  const routes = [{
    method: "GET",
    url: `/`,
    handler: async (req, reply) => {
      reply.send({ Application: "MyDreamStory", state: "OnLine", version: "1.0.0" });
    }
  }];
  const methodsType = ["POST" , "GET", "PUT", "DELETE"]
  const methodColor = new Map([
    ["GET" , "\x1b[32m"],
    ["POST" , "\x1b[33m"],
    ["PUT" , "\x1b[34m"],
    ["DELETE" , "\x1b[31m"],
  ])

  const traverse = dir => {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      const [route,method,type] = file.split(".")

      if (stat.isDirectory()) {
        traverse(fullPath);
      }else if(route && method && type){
        if(type!== "js"){
          logger.error("Error with file extension")
          return;
        }
        if(!methodsType.includes(method.toUpperCase())){
          logger.error("Error with method with "+file)
          return;
        }
        const directory = fullPath.split("\\")
        const routeInfo = {
          method: method.toUpperCase(),
          url: `/routes/${directory[directory.length - 2]}/`,
          handler: require(fullPath),
        }

        if(route !== "index"){
          routeInfo.url += route
        }
        logger.info(`${logger.color.green}[ROUTE] :${logger.color.clear} ${methodColor.get(routeInfo.method)}[${routeInfo.method}]\x1b[0m ${routeInfo.url} pushed successfully`)
        routes.push(routeInfo);
      }
    });
  };

  traverse(baseDir);
      logger.info("Fin de récupération des routes")
      return routes;
};

module.exports = loadRoutes();

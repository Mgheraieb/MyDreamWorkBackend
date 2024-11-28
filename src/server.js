const fastify = require('fastify')({ logger: true }); 
const routes = require('../routes');

// Dynamically load all routes


routes.forEach(route => {
  fastify.route(route);
});

// Start serverls
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000/');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

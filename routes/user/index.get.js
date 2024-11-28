module.exports = async (req, reply) => {
  reply.send({ nom: "Login", method: "get", etat: "Online" });
};

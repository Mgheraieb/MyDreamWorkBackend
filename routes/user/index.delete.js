module.exports = async (req, reply) => {
  reply.send({ nom: "Login", method: "delete", etat: "Online" });
};
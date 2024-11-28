module.exports = async (req, reply) => {
  reply.send({ nom: "Login", method: "Put", etat: "Online" });
};

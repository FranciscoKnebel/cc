module.exports = function api(app, modules) {

  app.post('/criar/leilao', modules.isLoggedIn, (req, res) => {
    console.log(req.body);

    res.send(req.body);
  });
};

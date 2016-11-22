module.exports = function routes(app, modules) {
  app.post('/api/leilao/lance', modules.isLoggedIn, (req, res) => {
    const id = req.query.auctionid;
    const bid = req.query.bid;

    modules.Leilao.findById(id, (err, auction) => {
      if (err) {
        res.status(err.statusCode).send(err);
      }

      if (!auction) {
        res.status(404).send("Leilão inexistente");
      }

      const response = auction.newBid(req.user.id, bid);

      if (!response) {
        res.status(401).send("Valor do lance menor que o valor atual. Tente novamente.");
      } else {
        auction.save(() => {
          console.log(response);

          res.send(response);
        });
      }
    });
  });
};

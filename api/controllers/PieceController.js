/**
 * PieceController
 *
 * @description :: Server-side logic for managing pieces
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		subscribe: function(req, res) {
	    if( ! req.isSocket) {
	      return res.badRequest();
	    }
		    sails.sockets.join(req.socket, 'piece');
		    //return res.ok();
	  },

	index: function (req, res)
  {
    var piece = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (piece.itemid > 0)
    {
      Piece.find({pieceitem: piece.itemid}, function (err, pieces)
      {
        if (err) return res.send(err, 500);
				piece.subscribe();
        res.view({model: pieces});
      })
    }
    else
    {
      Piece.find({}, function (err, pieces)
      {
        if (err) return res.send(err, 500);

        res.view({model: pieces});
      });
    }

  },

  new: function(req, res)
  {
    res.view('piece/new');
  },

  create: function (req, res)
  {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    Piece.create(params, function (err, createdPiece)
    {
      if (err) return res.send(err, 500);

      res.redirect('piece/show/' + createdPiece.id);
    });
  },

  show: function (req, res)
  {
    var id = req.param('id');
    if (!id) return res.send("No ID specified.", 500);
    //console.log(id);
    Piece.findOne({id:id}, function (err, piece)
    {

      if(err) return res.sender(err, 500);
      if(!piece) return res.send("Piece "+id+" not found.", 404);
      //console.log(piece.filetype);
			
      res.view({piece: piece});
    });
  },

  edit: function (req, res)
  {
    var id = req.param('id');

    if(!id) return res.send("No ID specified.", 500);

    Piece.findOne({id: id}, function (err, piece)
    {
        if(err) return res.send(err, 500);
        if(!piece) return res.send("Piece " + id + " not found.", 404);

        res.view({piece: piece});
    });
  },

  update: function (req, res)
	{
		var params = _.merge({}, req.params.all(), req.body);
		var id = params.id;

		if(!id) return res.send("No ID specified.", 500);
		Piece.update({id:id}, params, function(err, updatedPiece)
		{
				if(err) res.redirect('item/edit');
				if(!updatedPiece) res.redirect('item/edit');
				res.redirect('item/show/'+ updatedPiece[0].id);
		});
	},

  attach: function (req, res)
  {
      var fileattachment = req.file('attachment');
      console.log(fileattachment);
      fileattachment.upload(function (err, files)
      {
        if(err) return res.serverError(err);
        console.log(files);
        res.json({ status: 200, file: files });
      });
  },

  destroy: function (req, res)
  {
    var id = req.param('id');
    if (!id) return res.send("No ID specified.", 500);

    Piece.findOne({id: id}, function (err, piece)
    {
      if(err) return res.send(err, 500);
      if(!piece) return res.send("No piece with that ID exists.", 404);

      Piece.destroy({id:id}, function (err)
      {
          if(err) return res.send(err, 500);
          return res.redirect('/piece');
      });
    });
	}

};

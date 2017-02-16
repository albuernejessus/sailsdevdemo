/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res)
  {
    var entry = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (entry.entryid > 0)
    {
      Item.find({itementry: entry.entryid}, function (err, items)
      {
        if (err) return res.send(err, 500);

        res.view({model: items});
      })
    }
    else
    {
      Item.find({}, function (err, items)
      {
        if (err) return res.send(err, 500);

        res.view({model: items});
      });
    }

  },

  new: function(req, res)
  {
    res.view('item/new');
  },

  create: function (req, res)
  {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    Item.create(params, function (err, createdItem)
    {
      if (err) return res.send(err, 500);

      res.redirect('item/show/' + createdItem.id);
    });
  },

  show: function (req, res)
  {
    var id = req.param('id');
    if (!id) return res.send("No ID specified.", 500);
    //console.log(id);
    Item.findOne({id:id}, function (err, item)
    {

      if(err) return res.sender(err, 500);
      if(!item) return res.send("Item "+id+" not found.", 404);
      //console.log(entry.name);
      res.view({item: item});
    });
  },

  edit: function (req, res)
  {
    var id = req.param('id');

    if(!id) return res.send("No ID specified.", 500);

    Item.findOne({id: id}, function (err, item)
    {
        if(err) return res.send(err, 500);
        if(!item) return res.send("Item " + id + " not found.", 404);

        res.view({item: item});
    });
  },

  update: function (req, res)
	{
		var params = _.merge({}, req.params.all(), req.body);
		var id = params.id;

		if(!id) return res.send("No ID specified.", 500);
		Item.update({id:id}, params, function(err, updatedItem)
		{
				if(err) res.redirect('item/edit');
				if(!updatedItem) res.redirect('item/edit');
				res.redirect('item/show/'+ updatedItem[0].id);
		});
	},

  destroy: function (req, res)
  {
    var id = req.param('id');
    if (!id) return res.send("No ID specified.", 500);

    Item.findOne({id: id}, function (err, item)
    {
      if(err) return res.send(err, 500);
      if(!item) return res.send("No item with that ID exists.", 404);

      Item.destroy({id:id}, function (err)
      {
          if(err) return res.send(err, 500);
          return res.redirect('/item');
      });
    });
  }

};

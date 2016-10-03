/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res)
	{
		Item.find().exec(function (err, items)
		{
			if (err) return res.send(err, 500);

			res.view({model: items});
		});
	},

	create: function (req, res)
	{
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		Item.create(params, function itemCreated(err, createdItem)
		{
			if (err) return res.send(err, 500);

			res.redirect('/item/show/' + createdItem.id);
		});
	},

	show: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);
		//console.log(id);
		item.findOne({id:id}).exec(function (err, item)
		{

			if(err) return res.sender(err, 500);
			if(!item) return res.send("item "+id+" not found.", 404);
			//console.log(item.name);
			res.view({item: item});
		});
	},

	edit: function (req, res)
	{
		var id = req.param('id');

		if(!id) return res.send("No ID specified.", 500);

		item.findOne({id: id}).exec(function (err, item)
		{
				if(err) return res.send(err, 500);
				if(!item) return res.send("item " + id + " not found.", 404);

				res.view({item: item});
		});
	},

	update: function (req, res)
	{
		var params = _.merge({}, req.params.all(), req.body);
		var id = params.id;

		if(!id) return res.send("No ID specified.", 500);
		//console.log(params.id);
		//console.log(params.name);
		item.update({id:id}, params, function(err, updateditem)
		{
				if(err) res.redirect('item/edit');
				if(!updateditem) res.redirect('item/edit')
				//console.log(updateditem.name);
				res.redirect('item/show/'+id);
		});
	},

	destroy: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);

		item.findOne({id: id}, function founditem(err, item)
		{
			if(err) return res.send(err, 500);
			if(!item) return res.send("No item with that ID exists.", 404);

			item.destroy({id:id}, function itemDestroyed(err)
			{
					if(err) return res.send(err, 500);
					return res.redirect('/item');
			});
		});
	}

};

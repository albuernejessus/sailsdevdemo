/**
 * EntryController
 *
 * @description :: Server-side logic for managing Entries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res)
	{
		Entry.find({}, function (err, entries)
		{
			if (err) return res.send(err, 500);

			res.view({model: entries});
		});
	},

	new: function(req, res)
	{
		res.view('entry/new');
	},

	create: function (req, res)
	{
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		Entry.create(params, function (err, createdEntry)
		{
			if (err) return res.send(err, 500);
			res.redirect('entry/show/' + createdEntry.id);
		});
	},

	show: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);
		//console.log(id);
		Entry.findOne({id:id}, function (err, entry)
		{

			if(err) return res.sender(err, 500);
			if(!entry) return res.send("Entry "+id+" not found.", 404);
			//console.log(entry.name);
			res.view({entry: entry});
		});
	},

	edit: function (req, res)
	{
		var id = req.param('id');

		if(!id) return res.send("No ID specified.", 500);

		Entry.findOne({id: id}, function (err, entry)
		{
				if(err) return res.send(err, 500);
				if(!entry) return res.send("Entry " + id + " not found.", 404);

				res.view({entry: entry});
		});
	},

	update: function (req, res)
	{
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
		var id = params.id;

		if(!id) return res.send("No ID specified.", 500);
		Entry.update({id:id}, params, function(err, updatedEntry)
		{
				if(err) res.redirect('entry/edit');
				if(!updatedEntry) res.redirect('entry/edit');
				res.redirect('entry/show/' + updatedEntry[0].id);
		});
	},

	destroy: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);

		Entry.findOne({id: id}, function (err, entry)
		{
			if(err) return res.send(err, 500);
			if(!entry) return res.send("No entry with that ID exists.", 404);

			Entry.destroy({id:id}, function (err)
			{
					if(err) return res.send(err, 500);
					return res.redirect('/entry');
			});
		});
	}

};

/**
 * CompetitionController
 *
 * @description :: Server-side logic for managing competitions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res)
	{
		Competition.find({},function (err, competitions)
		{
			if (err) return res.send(err, 500);

			res.view({model: competitions});
		});
	},

	new: function(req, res)
	{
		res.view('competition/new');
	},

	create: function (req, res)
	{
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		Competition.create(params, function (err, createdCompetition)
		{
			if (err) return res.send(err, 500);
			res.redirect('competition/show/' + createdCompetition.id);
		});
	},

	show: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);
		//console.log(id);
		Competition.findOne({id:id}, function (err, competition)
		{

			if(err) return res.sender(err, 500);
			if(!competition) return res.send("Competition "+id+" not found.", 404);
			//console.log(entry.name);
			res.view({competition: competition});
		});
	},

	edit: function (req, res)
	{
		var id = req.param('id');

		if(!id) return res.send("No ID specified.", 500);

		Competition.findOne({id: id}, function (err, competition)
		{
				if(err) return res.send(err, 500);
				if(!competition) return res.send("Competition " + id + " not found.", 404);

				res.view({competition: competition});
		});
	},

	update: function (req, res)
	{
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
		var id = params.id;

		if(!id) return res.send("No ID specified.", 500);
		Competition.update({id:id}, params, function(err, updatedCompetition)
		{
				if(err) res.redirect('competition/edit');
				if(!updatedCompetition) res.redirect('competition/edit');
				res.redirect('competition/show/' + updatedCompetition[0].id);
		});
	},

	destroy: function (req, res)
	{
		var id = req.param('id');
		if (!id) return res.send("No ID specified.", 500);

		Competition.findOne({id: id}, function (err, competition)
		{
			if(err) return res.send(err, 500);
			if(!competition) return res.send("No competition with that ID exists.", 404);

			Competition.destroy({id:id}, function (err)
			{
					if(err) return res.send(err, 500);
					return res.redirect('/competition');
			});
		});
	}
};

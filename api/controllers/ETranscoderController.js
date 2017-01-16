/**
 * ETranscoderController
 *
 * @description :: Server-side logic for managing Etranscoders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res)
	{
		var awssdk = require('aws-sdk');
		//var awsconfig = new awssdk.Config({region: 'us-west-2'});
		var myS3 = new awssdk.S3({accessKeyId: 'AKIAJUXMO6V5JYDFWFAQ', secretAccessKey: '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', region: 'us-west-2'});
		var params = {
  									Bucket: 'testsrcbucket1' /* required */
  									//Delimiter: 'STRING_VALUE',
  								// EncodingType: 'url'
  							   //Marker: 'STRING_VALUE',
  							 	//MaxKeys: 0
  								//Prefix: 'STRING_VALUE',
  								//RequestPayer: 'requester'
								};
		myS3.listObjects(params, function(err, data) {
  	if (err) console.log(err, err.stack); // an error occurred
  	else     res.json(data);           // successful response
});
	},

	getPipelines: function(req, res)
	{
		var awssdk = require('aws-sdk');
		var myElasticTranscoder = new awssdk.ElasticTranscoder({accessKeyId: 'AKIAJUXMO6V5JYDFWFAQ', secretAccessKey: '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', region: 'us-west-2'});
		var params = {Ascending: 'true'};
		myElasticTranscoder.listPipelines(params, function(err, data)
		{	if (err) console.log(err, err.stack); // an error occurred
  		else     res.json(data); 	// successful response

		});
	},

	getJobs: function(req, res)
	{
		var awssdk = require('aws-sdk');
		var myElasticTranscoder = new awssdk.ElasticTranscoder({accessKeyId: 'AKIAJUXMO6V5JYDFWFAQ', secretAccessKey: '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', region: 'us-west-2'});
		var params = {PipelineId: '1483655200218-nuhuq4', Ascending: 'true'};
		myElasticTranscoder.listJobsByPipeline(params, function(err, data) {
  		if (err) console.log(err, err.stack); // an error occurred
  		else     res.json(data);           // successful response
		});
	},

	transcode: function(req, res)
	{
		var awssdk = require('aws-sdk');
		var myElasticTranscoder = new awssdk.ElasticTranscoder({accessKeyId: 'AKIAJUXMO6V5JYDFWFAQ', secretAccessKey: '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', region: 'us-west-2'});
		var params = {PipelineId: '1483655200218-nuhuq4', Input:{Key: '050aa40e-9a5d-4b14-9d4a-041fdca50855.avi'}, Output:{Key: 'testsailstranscode1.mp4', PresetId: '1351620000001-000050',ThumbnailPattern: 'testoutput1{count}'}};
		myElasticTranscoder.createJob(params, function(err, data) {
  			if (err) console.log(err, err.stack); // an error occurred
  			else     res.json(data);           // successful response
});
	}

};

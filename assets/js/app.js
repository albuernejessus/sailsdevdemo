//assets/js/app.js

var feedApp = angular.module('feedApp', ['ngResource', 'angularMoment', 'ngAnimate']);

feedApp.controller('FeedCtrl', ['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
  $scope.feedEntries = $resource('/feed').query();

  io.socket.get('/feed/subscribe', function(data, jwr) {
    io.socket.on('new_entry', function(entry) {
      $timeout(function() {
        $scope.feedEntries.unshift(entry);
        if (entry.Description = "video")
        {
          if($('#videoplayer-container').is(":visible "))
            {
                $("#home_video").get(0).pause();
                $('#videoplayer-container').hide();
            }
          else
          {
            $('#videoplayer-container').show();
            $("#home_video").get(0).play();
          }
        }

      });
    });
  });
}]);

var pieceApp = anuglar.module('pieceApp', ['ngResource', 'angularMoment', 'ngAnimate']);

pieceApp.controller('PieceCtrl', ['$scope', '$resource', '$timeout', function($scope, $resource, $timeout) {
  $scope.pieces = $resource('/piece/index').query();

  io.socket.get('/piece/show/', 1, function(data, jwres) {
    console.log('got piece show');
    io.socket.on('show', function(piece) {
      $timeout(function() {
        $scope.pieces.unshift(piece);
        if (piece.filetype = "video")
        {
          if(!$('#video_container').is(":visible "))
          {
              $('#videoplayer_container').show();
              $('#videoplayer').get(0).reset();
              $('#videoplayer').get(0).src(piece.filepath);
              if('#videoplayer').get(0).readyState() >= 2)
              {
                  $('#videoplayer').get(0).play();
              }
          }
          if($('#pdf_container').is(":visible"))
          {
            $('#pdf_container').hide();
          }
          if($('#image_container').is(":visible"))
          {
            $('#image_container').hide();
          }
        }
        else if (piece.filetype = "pdf")
        {
          if($('#video_container').is(":visible "))
          {
              $("#videoplayer").get(0).reset();
              $('#videoplayer_container').hide();

          }
          if(!$('#pdf_container').is(":visible"))
          {
            $('#pdf_container').show();
          }
          if($('#image_container').is(":visible"))
          {
            $('#image_container').hide();
          }
        }
        else if(piece.filetype = "image")
        {
          if($('#video_container').is(":visible "))
          {
              $("#videoplayer").get(0).reset();
              $('#videoplayer_container').hide();

          }
          if($('#pdf_container').is(":visible"))
          {
            $('#pdf_container').hide();
          }
          if(!$('#image_container').is(":visible"))
          {
            $('#image_container').show();
          }
        }

      });
    });
  });
}]);

juke.directive('songList', function(PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/song/templates/song.directive.html',
        scope: {
            songs: "="
        },
        link: function(scope) {

            scope.toggle = function(song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                    PlayerFactory.start(song, scope.songs);
                } else if (PlayerFactory.isPlaying()) {
                    PlayerFactory.pause();
                } else {
                    PlayerFactory.resume();
                }
            };

            scope.getCurrentSong = function() {
                return PlayerFactory.getCurrentSong();
            };

            scope.isPlaying = function(song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
            };
        }
    }
})
.directive('doubleClick', function($parse){
    //do this or just use ng-dblclick
    return {
        restrict: 'A',
        //this might cause scope issues, so try to use attributes rather than setting with scope and &
        // scope: {
        //     doubleClick: "&"
        // },
        link: function(scope, element, attribute) {
            var fn = $parse(attribute['doubleClick'])
            element.on('dblclick', function(){
                fn(scope);
            } )
        }
    }
})
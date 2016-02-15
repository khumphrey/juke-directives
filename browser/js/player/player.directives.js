juke.directive('foot', function(PlayerFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/player/templates/player.footer.html',
        link: function(scope) {

        	angular.extend(scope, PlayerFactory);

            scope.toggle = function() {
                if (PlayerFactory.isPlaying()) PlayerFactory.pause();
                else PlayerFactory.resume();
            };

            scope.getPercent = function() {
                return PlayerFactory.getProgress() * 100;
            };

            scope.toggleProgress = function(e) {
                var width = angular.element(e.srcElement)[0].offsetWidth,
                    progressWidth = e.offsetX/width;
                PlayerFactory.updateCurrentTime(progressWidth);
            }

            scope.random = function() {
                PlayerFactory.random()
            }
        }
    }
})
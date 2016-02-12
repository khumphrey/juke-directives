juke.directive('albumList', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/album/templates/album.directives.html',
		scope: {
			albums: "="
		}
	}
})
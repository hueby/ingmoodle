
angular.module('mm.core.competence')

.controller('mmCompetenceCtrl', function($scope, $mmCompetence) {


  $scope.fullname = 'Kompetenzprofil';

  $mmCompetence.getTestFunction().then(function(data) {
    $scope.energyValue = data.energyValue;
    $scope.user = {
      firstname: data.firstname.charAt(0).toUpperCase() + data.firstname.slice(1),
      lastname: data.lastname.charAt(0).toUpperCase() + data.lastname.slice(1)
    };
    $scope.competenceLevel = data.level;
    $scope.color = data.colors;
    $scope.avatar = data.house;

    var theDate = new Date(data.lastactivity * 1000);
    $scope.lastactivity = theDate.getDate() + '.' + (theDate.getMonth()+1) + '.' + theDate.getFullYear() + ' ' + theDate.getHours() + ':' + (theDate.getMinutes()<10?'0':'') + '' + theDate.getMinutes() + ' Uhr';

    // open mods
    $scope.openMods = data.openMods;

    // closed mods
    $scope.closeMods = data.closeMods.map(function(el) {
      date = new Date(el.date *= 1000);
      el.date = date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + (date.getMinutes()<10?'0':'') + '' + date.getMinutes() + ' Uhr'; 
      return el;
    });

    $scope.loaded = true;
  });
});

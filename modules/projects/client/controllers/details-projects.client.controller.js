
(function () {
  'use strict';

  // Projects controller
  angular
    .module('projects')
    .controller('ProjectsDetailsController', ProjectsDetailsController);

  ProjectsDetailsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function ProjectsDetailsController ($scope, $state, $window, Authentication, project) {
    var vm = this;

    vm.authentication = Authentication;
    vm.project = project;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Project
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.project.$remove($state.go('projects.list'));
      }
    }

    // Save Project
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.projectForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.project._id) {
        vm.project.$update(successCallback, errorCallback);
      } else {
        vm.project.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('projects.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

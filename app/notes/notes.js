(function() {
  angular.module('meganote.notes', ['ui.router'])
    .config(notesConfig)
    .controller('NotesController', NotesController);

  notesConfig.$inject = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

    .state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController'
    })

    .state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form.html'
    });
  }

  NotesController.$inject = ['$state', '$scope', 'NotesService'];
  function NotesController($state, $scope, NotesService) {
    $state.go('notes.form');

    NotesService.getNotes()
      .then(function() {
        $scope.notes = NotesService.notes;
      });


    $scope.clearForm = function() {
      $scope.note = { title: '', body_html: '' };
      $scope.editing = false;
    };

    $scope.add = function() {
      NotesService.create($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };

    $scope.edit = function(note, index) {
      $scope.editing = true;
      $scope.note = note;
      $scope.current_index = index;
    };

    $scope.save = function() {
      NotesService.update($scope.note)
        .then(function() {
          $scope.clearForm();
        });
    };

    $scope.delete = function(index) {
      NotesService.remove($scope.note, index)
        .then(function() {
          $scope.clearForm();
        });
    };

    $scope.clearForm();
  }
})();

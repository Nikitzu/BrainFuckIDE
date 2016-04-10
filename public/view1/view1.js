'use strict';

var v1 = angular.module('brainApp.view1',[
    'infinite-scroll']);


v1.controller('View1Controller', function($http, $interval, $scope, SourceService) {
    console.log("Controller scope", SourceService.sourceFiles);
    $scope.isAtInstruction = function(i) {
        return i == g_ip;
    };
    $scope.is_debug = false;

    $scope.setInterval = function(interval) {
        g_timeout = interval;
    };
    $scope.getInterval = function() {
        return g_timeout;
    };
    $scope.getInstruction = function() {return g_ip};
    $scope.getMemory = function() {return g_mp};
    $scope.$watch(function() {return g_ip}, function(n) {
        if ($scope.is_debug) {
            $('#edit_source')[0].selectionStart = n - 1;
            $('#edit_source')[0].selectionEnd = n;
        }
    });
    $scope.memory = g_memory;
    $scope.new = function() {
        var date = new Date();
        var newFile = {
            stats: {
                name: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds()
            },
            text : ''
        };
        SourceService.sourceFiles.push(newFile);
        SourceService.file = newFile;
        $http.post('/files', {fileName: SourceService.file.stats.name, fileText: SourceService.file.text});
    };
    $scope.save = function() {
        SourceService.file.text = $('#edit_source').val();
        $http.post('/files', {fileName: SourceService.file.stats.name, fileText: SourceService.file.text});
    };

    $interval(function() {
        $scope.save();
    }, 15000);

    $scope.delete = function(file) {
        $http.post('/delete', {fileName: file.stats.name, fileText: file.text});
    };

    $scope.positive = function() {
        $('#mem').val(Math.abs($('#mem').val()));
        if ($('#mem').val().charAt(0) == '-') $('#mem').val(0);
    };
    $scope.loadMore = load;
    $scope.lines = lines;
    $interval(function(){},100);

    $scope.tochar = function(int) {
        if(int <32 || int > 127)
            return '.';
        return String.fromCharCode(int);
    };
});
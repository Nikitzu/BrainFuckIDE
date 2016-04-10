/* Created by Андрей on 21.01.2016.
*/
var v1 = angular.module('brainApp.view1');

v1.service('SourceService', function() {
    this.sourceFiles = [];
    this.file = {};
    this.image = {};
});
var app = angular.module("Main",[]);
app.controller("WalletCtrl",function($scope){
  $scope.reset = function(){
    localStorage.setItem("wallet",null);
  }
  $scope.income = function(){

  }
  $scope.withdraw = function(){

  }
  $scope.getTotal = function(){
    
  }
});

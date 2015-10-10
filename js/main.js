var app = angular.module("Main",[]);
app.controller("WalletCtrl",function($scope){
  $scope.wallet = JSON.parse(localStorage.getItem("wallet"));
  if($scope.wallet==null){
    $scope.wallet = {
      amounts: 0
    }
  }
  $scope.reset = function(){
    localStorage.setItem("wallet",null);
  }
  $scope.income = function(){
    swal({
      title: "Add income!",
      text: "Insert the amount of the income:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: ""
    },
      function(inputValue){
        if (inputValue === false) return false;
        if (inputValue === "" || !parseInt(inputValue)) {
          swal.showInputError("You need to write something true!");
          return false
        }

        swal("Income registered!", "You have registered a new income!","success");
      }
    );
  }
  $scope.withdraw = function(){
    swal({
      title: "Add withdrawal!",
      text: "Insert the amount of the withdrawal:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: ""
    },
      function(inputValue){
        if (inputValue === false) return false;
        if (inputValue === "" || !parseInt(inputValue)) {
          swal.showInputError("You need to write something true!");
          return false
        }
        swal("Withdrawal registered!", "You have registered a new withdrawal!","success");
      }
    );
  }
  $scope.getTotal = function(){

  }
});

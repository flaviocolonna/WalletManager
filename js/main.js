var app = angular.module("Main",[]);
app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
app.controller("WalletCtrl",function($scope){
  $scope.check = function(){
    $scope.wallet = JSON.parse(localStorage.getItem("wallet"));
    if($scope.wallet==null){
      $scope.wallet = {
        amounts: [],
        total: 0,
        totalWithdrawals:0,
        totalIncomes:0
      }
      localStorage.setItem("wallet",JSON.stringify($scope.wallet));
    }
    var total = 0;
    var totalIncomes = 0;
    var totalWithdrawals = 0;
    var totalSaved = $scope.wallet.total;
    var totalIncomesSaved = $scope.wallet.totalIncomes;
    var totalWithdrawalsSaved = $scope.wallet.totalWithdrawals;
    for(var i = 0; i<$scope.wallet.amounts.length; i++){
      if($scope.wallet.amounts[i].type=="1"){
        total = parseFloat(total) + parseFloat($scope.wallet.amounts[i].total);
        totalIncomes = parseFloat(totalIncomes) + parseFloat($scope.wallet.amounts[i].total);
      }else if($scope.wallet.amounts[i].type=="0"){
        total = parseFloat(total) - parseFloat($scope.wallet.amounts[i].total);
        totalWithdrawals = parseFloat(totalWithdrawals) + parseFloat($scope.wallet.amounts[i].total);
      }
    }
    if(total!=totalSaved){
      swal("Error total","Total corrupted after checking. Fixed!","error");
      $scope.wallet.total = parseFloat(total);
      localStorage.setItem("wallet",JSON.stringify($scope.wallet));
    }
    if(totalIncomes!=totalIncomesSaved){
      swal("Error total incomes","Total incomes corrupted after checking. Fixed!","error");
      $scope.wallet.totalIncomes = parseFloat(totalIncomes);
      localStorage.setItem("wallet",JSON.stringify($scope.wallet));
    }
    if(totalWithdrawals!=totalWithdrawalsSaved){
      swal("Error total withdrawals","Total withdrawals corrupted after checking. Fixed!","error");
      $scope.wallet.totalWithdrawals = parseFloat(totalWithdrawals);
      localStorage.setItem("wallet",JSON.stringify($scope.wallet));
    }
  }
  $scope.check(); //checking if the total saved on local storage is correct or corrupted. If corrupted it will be fixed
  $scope.reset = function(){
    $scope.wallet = {
      amounts: [],
      total: 0,
      totalWithdrawals:0,
      totalIncomes:0
    }
    localStorage.setItem("wallet",JSON.stringify($scope.wallet));
    $('#menu-mobile').collapse("toggle");
  }
  /* This function is used to add a new income into the wallet*/
  $scope.income = function(){
    // open the sweetalert prompt
    swal({
      title: "Add income!",
      text: "Insert the amount of the income:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Eg. 10.50"
    },
      function(inputValue){
        if (inputValue === false) return false;//if there is no data in the input, prompt will be closed
        if (inputValue === "" || !parseFloat(inputValue)) { //if there is the minus sign in the input, prompt will return an error
          swal.showInputError("You need to write something true!");
          return false
        }
        var newAmount = {
          total:parseFloat(inputValue),
          date:new Date(),
          type: "1", //1 means income
          index: $scope.wallet.amounts.length
        };
        $scope.$apply(function(){
          $scope.wallet.amounts.push(newAmount);
          $scope.wallet.total = $scope.wallet.total!=null ? parseFloat($scope.wallet.total)+parseFloat(inputValue) : parseFloat(inputValue);
        });
        localStorage.setItem("wallet",JSON.stringify($scope.wallet));
        $scope.check();//check if every total is correct
        swal("Income registered!", "You have registered a new income!","success");
      }
    );
  }
    /* This function is used to add a new withdrawal into the wallet*/
  $scope.withdrawal = function(){
      // open the sweetalert prompt
    swal({
      title: "Add withdrawal!",
      text: "Insert the amount of the withdrawal:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Eg. 10.50"
    },
      function(inputValue){
        if (inputValue === false) return false; //if there is no data in the input, prompt will be closed
        if (inputValue.indexOf("-")>=0){ //if there is the minus sign in the input, prompt will return an error
            swal.showInputError("You cannot write negative sign!");
            return false;
          }
        if (inputValue === "" || !parseFloat(inputValue)) { //if there is a character inside the input, prompt will return an error
          swal.showInputError("You need to write something true!");
          return false
        }
        var newAmount = {
          total:parseFloat(inputValue),
          date:new Date(),
          type: "0" //0 means Withdrawal
        };
        if((parseFloat($scope.wallet.total)-parseFloat(inputValue))<0){ ////if the number will make a negative total, an error will be shown
          swal("Error total amount","The wallet can never contain a negative amount!","error");
          return false
        }
        $scope.wallet.total = parseFloat($scope.wallet.total)-parseFloat(inputValue);
        $scope.wallet.amounts.push(newAmount);
        $scope.$apply();
        localStorage.setItem("wallet",JSON.stringify($scope.wallet));
        $scope.check(); //check if every total is correct
        swal("Withdrawal registered!", "You have registered a new withdrawal!","success");
      }
    );
  }

});

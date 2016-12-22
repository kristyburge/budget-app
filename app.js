
// BUDGET CONTROLLLER
var budgetController = (function() {
    
   // some code
    
})();




// UI CONTROLLER
var UIController = (function() {
    
    // some code
    
})();


// GLOBAL APP CONTROLLER 
var controller = (function(budgetCntrl, UICntrl) {
    
    var controlAddItem = function(){
        
        // 1. Get the field input data
        console.log('Hello World!');
        
        // 2. Add the item to the budget controller
        
        
        // 3. Add the new item to the UI
        
        
        // 4. Calculate the budget
        
        
        // 5. Display the budget on the UI
        
    };
    
    document.querySelector('.add__btn').addEventListener('click', controlAddItem);
    
    
    document.addEventListener('keypress', function(event){
        
        // use .which to add support for older browsers
        if (event.keyCode === 13 || event.which === 13){
            controlAddItem(); 
        }
        
    });
    
})(budgetController, UIController);













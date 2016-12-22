// BUDGET CONTROLLLER
var budgetController = (function() {
    
    // each new item needs description and a value + distinguish by #id income vs. expense
    
    
    // create a function constructor for income and expense types
    var Expense = function(id, description, value){
      
        this.id = id;
        this.description = description;
        this.value = value;
        
    };
    
    
    var Income = function(id, description, value){
        
        this.id = id;
        this.description = description;
        this.value = value;
        
    };
    

    var data = {
        
        allItems: {
            expenses: [],
            income: []
        },        
        totals: {
            expenses: 0,
            income: 0
        }
    }

})();




// UI CONTROLLER
var UIController = (function() {
    
    // create private variable/object to store DOM strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }
    
    // return an object that contains a method to get input values
    return {
      getInput: function() {
          
          return { // return an object with three properties instead of having 3 separate variables
            type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
          };
          
        }, 

    // pass DOMstrings object to the global app controller
    getDOMstrings: function() {
        return DOMstrings;
        }

    };
    
})();


// GLOBAL APP CONTROLLER 
var controller = (function(budgetCntrl, UICntrl) {
    
    // private function that sets up the event listeners
    var setUpEventListeners = function() {
       
        var DOM = UICntrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', controlAddItem);
    
        document.addEventListener('keypress', function(event){
        
            // use .which to add support for older browsers
            if (event.keyCode === 13 || event.which === 13){
                controlAddItem(); 
            }
        
        });
    };
    
    
      
    // private function that gets called when we want to add a new item
    var controlAddItem = function(){
        
        // 1. Get the field input data when enter key or button is clicked
        var input = UICntrl.getInput();
        console.log(input);
        
        // 2. Add the item to the budget controller
        
        
        // 3. Add the new item to the UI
        
        
        // 4. Calculate the budget
        
        
        // 5. Display the budget on the UI
        
    };
    
    
    // create a public initialization function
    // return in an object to make public
    
    return {
        init: function() {
            //console.log('Application has begun.');
            setUpEventListeners();
        }
    }
    
    
    
})(budgetController, UIController);


// begin the app or nothing will ever run because the event listeners are in a private function
controller.init();

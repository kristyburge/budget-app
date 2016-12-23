// BUDGET CONTROLLLER
var budgetController = (function () {

    // each new item needs description and a value + distinguish by #id income vs. expense


    // create a function constructor for income and expense types
    var Expense = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };


    var Income = function (id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };


    var data = {

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // create public method to allow other modules to add new items to the data structure
    return {
        addItem: function (type, desc, val) {
            var newItem, ID;

            // assign a unique id to each new expense or income item
            // ID = last ID + 1

            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // console.log('The new ID for this item is: ' + ID);

            // create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, desc, val);
            } else if (type === "inc") {
                newItem = new Income(ID, desc, val);
            }

            // add new exp or inc to the end of the allItems.exp or allItems.inc array
            data.allItems[type].push(newItem);

            // return the new item
            return newItem;

        }

//        testing: function () {
//            console.log(data);
//        }

    }

})();




// UI CONTROLLER
var UIController = (function () {

    // create private variable/object to store DOM strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    // return an object that contains a method to get input values
    return {
        getInput: function () {

            return { // return an object with three properties instead of having 3 separate variables
                type: document.querySelector(DOMstrings.inputType).value, // will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };

        },

        addListItem: function (obj, type) {
            
            // declare variables
            var html, newHtml, element;
            
            // create HTML string with placeholder text
            if (type === 'inc') {
                
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                
            } else if (type === 'exp') {
                
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                
            }
            
            // replace placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  
            
            
        },
        
        clearFields: function() {
            
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            
            // convert list to array. 
            // since querySelectorAll returns a string, use Array.prototype to call .slice and then bind the this variable to fields using .call
            fieldsArray = Array.prototype.slice.call(fields);
            
            // use .foreach method that works like the for loop
            // the anonymous function in the .foreach method can receive up to 3 arguments
            fieldsArray.forEach(function(currentValue, index, array){
                // set the value of the currentValue to empty
                currentValue.value = "";
            });
            
            // set the focus back to the description element when cleared
            fieldsArray[0].focus();
            
        },

        // pass DOMstrings object to the global app controller
        getDOMstrings: function () {
            return DOMstrings;
        }

    };

})();


// GLOBAL APP CONTROLLER 
var controller = (function (budgetCntrl, UICntrl) {

    // private function that sets up the event listeners
    var setUpEventListeners = function () {

        var DOM = UICntrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', controlAddItem);

        document.addEventListener('keypress', function (event) {

            // use .which to add support for older browsers
            if (event.keyCode === 13 || event.which === 13) {
                controlAddItem();
            }

        });
    };



    // private function that gets called when we want to add a new item
    var controlAddItem = function () {
        // declare variables
        var input, newItem;


        // 1. Get the field input data when enter key or button is clicked
        input = UICntrl.getInput();
        // console.log(input);

        // 2. Add the item to the budget controller
        newItem = budgetCntrl.addItem(input.type, input.description, input.value);

        // 3. Add the new item to the UI
        UICntrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICntrl.clearFields();

        // 5. Calculate the budget


        // 6. Display the budget on the UI

    };


    // create a public initialization function
    // return in an object to make public

    return {
        init: function () {
            //console.log('Application has begun.');
            setUpEventListeners();
        }
    }



})(budgetController, UIController);


// begin the app or nothing will ever run because the event listeners are in a private function
controller.init();
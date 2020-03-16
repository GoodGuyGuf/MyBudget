class BudgetAdapter{
    constructor(url){
        this.url = url
    }

    static newBudget(budgetObject) {
        let fetchObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            redirect: "follow",
            body: JSON.stringify(budgetObject)
        }
    fetch("http://localhost:3000/budgets", fetchObject)
        .then(function(response) { 
        return response.json();
    })
    .then(function(json){
        let navUserGrab = document.getElementById("navUser")
        let userName = navUserGrab.innerText.slice(6)
        let foundUser = User.all.find(user => user.username === userName)
        let budgetObj = {id: json.data.id, ...json.data.attributes, user_id: foundUser.id}
        new Budget(budgetObj);
        console.log(budgetObj);
        addToDom(json.data.id, json.data.attributes);
    })
    .catch(function(error) {
        alert("Fetch has gone through. Something else has gone wrong.");
        console.log(error.message);
      });
    }

}

function addToDom(id, object) {

    let numberOfBudgets = document.getElementById("navInfo");
    numberOfBudgets.innerText = `Number of Budgets: ${Budget.all.length}`;
    let div = document.createElement("div");
    div.id=`BudgetDiv${id}`;
    div.className="BudgetDiv"
    
    let newH1 = document.createElement("h1");
    newH1.id = `Budget${id}`;
    newH1.textContent = `Budget for: ${object.title} - Balance: $${object.bank}`;

    let remaining = document.createElement("h4")
    remaining.innerText="Remaining Balance:";

    let remainingValue = document.createElement("h4")
    remainingValue.id=`remainingValue${id}`;
    remainingValue.innerText=`$${object.bank}`;

    document.body.appendChild(div);
    div.appendChild(newH1);
    createExpenseForm(id);

    div.appendChild(remaining);
    div.appendChild(remainingValue);
}

// Originally was in the file BudgetFetch:
let budgetSubmit = document.getElementById("budgetSubmit");
budgetSubmit.addEventListener("click", function(){
    let navUserGrab = document.getElementById("navUser")
    // let userName = navUserGrab.innerText.slice(6)
    let foundUser = User.all[0]
    let budgetTitle = document.querySelector("#budgetTitle").value
    let budgetBank = document.querySelector("#budgetBank").value
    console.log(foundUser)
    let budgetObject = {title: budgetTitle, bank: budgetBank, user_id: JSON.stringify(foundUser.id)}
    BudgetAdapter.newBudget(budgetObject)
})
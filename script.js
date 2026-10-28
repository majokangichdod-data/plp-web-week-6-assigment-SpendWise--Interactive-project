// 1. Store the monthly budget
const monthlyBudget = 50000;

// 2. Store multiple expenses in an array
let expenses = [
    {
        id: 1,
        name: "Groceries",
        amount: 2500,
        category: "Food",
        date: "2026-10-25"
    },
    {
        id: 2,
        name: "Bus fare",
        amount: 800,
        category: "Transport",
        date: "2026-10-26"
    }
];

// Get HTML elements using the DOM
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalExpensesDisplay =
    document.getElementById("total-expenses");
const balanceDisplay = document.getElementById("balance");
const budgetDisplay = document.getElementById("budget");
const feedback = document.getElementById("feedback");
const clearButton = document.getElementById("clear-expenses");

// 3. Calculate total expenses using a loop
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// 4. Display expenses and update the dashboard
function updateDashboard() {
    const total = calculateTotal();
    const balance = monthlyBudget - total;

    budgetDisplay.textContent = monthlyBudget.toLocaleString();
    totalExpensesDisplay.textContent = total.toLocaleString(
        "en-KE",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );
    balanceDisplay.textContent = balance.toLocaleString(
        "en-KE",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    );

    // Clear the old rows before displaying updated records
    expenseList.replaceChildren();

    // Loop through the array and display every expense
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = expense.amount.toLocaleString(
            "en-KE",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        );

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function () {
            expenses = expenses.filter(function (item) {
                return item.id !== expense.id;
            });

            updateDashboard();
            showFeedback("Expense deleted successfully.");
        });

        actionCell.appendChild(deleteButton);

        row.append(
            nameCell,
            amountCell,
            categoryCell,
            dateCell,
            actionCell
        );

        expenseList.appendChild(row);
    }

    // 5. Make decisions based on budget information
    if (balance < 0) {
        balanceDisplay.style.color = "red";
        feedback.textContent =
            "Warning: You have exceeded your monthly budget!";
    } else if (balance === 0) {
        balanceDisplay.style.color = "red";
        feedback.textContent =
            "You have used your entire monthly budget.";
    } else if (total >= monthlyBudget * 0.8) {
        balanceDisplay.style.color = "darkorange";
        feedback.textContent =
            "Caution: You have spent at least 80% of your budget.";
    } else {
        balanceDisplay.style.color = "green";
        feedback.textContent =
            "You are within your monthly budget. Keep it up!";
    }
}

// Display feedback after a user action
function showFeedback(message) {
    feedback.textContent = message;
}

// 6. Handle the Add Expense form submission
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Validate user input using conditional statements
    if (name === "") {
        showFeedback("Please enter an expense name.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        showFeedback("Please enter an amount greater than zero.");
        return;
    }

    if (category === "") {
        showFeedback("Please select an expense category.");
        return;
    }

    // Add a new record to the array
    const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString("en-CA")
    };

    expenses.push(newExpense);

    // Refresh the page content
    updateDashboard();
    expenseForm.reset();

    // Show the result of the user's action
    const total = calculateTotal();

    if (total > monthlyBudget) {
        showFeedback(
            "Expense added, but you have exceeded your budget!"
        );
    } else {
        showFeedback("Expense added successfully!");
    }
});

// 7. Handle the Clear All button
clearButton.addEventListener("click", function () {
    if (expenses.length === 0) {
        showFeedback("There are no expenses to clear.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to clear all expenses?"
    );

    if (confirmed) {
        expenses = [];
        updateDashboard();
        showFeedback("All expenses have been cleared.");
    }
});

// Display initial records when the page loads
updateDashboard();
/*
SpendWise Budget Calculator
Purpose: Calculate a user's remaining budget.
*/

// 1. Store application data using variables
let budget = 0;
let totalExpenses = 0;
let remainingBalance = 0;

// 2. Function to calculate total expenses
function calculateTotalExpenses(expense1, expense2, expense3) {
    return expense1 + expense2 + expense3;
}

// 3. Function to calculate the remaining balance
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

// 4. Collect user input
let budgetInput = prompt("Enter your total budget:");

let expense1Input = prompt("Enter your first expense:");
let expense2Input = prompt("Enter your second expense:");
let expense3Input = prompt("Enter your third expense:");

// 5. Convert user input from text to numbers
budget = Number(budgetInput);
let expense1 = Number(expense1Input);
let expense2 = Number(expense2Input);
let expense3 = Number(expense3Input);

// 6. Calculate the budget
totalExpenses = calculateTotalExpenses(
    expense1,
    expense2,
    expense3
);

remainingBalance = calculateRemainingBalance(
    budget,
    totalExpenses
);

// 7. Display clearly labeled results
console.log("===== SpendWise Budget Report =====");
console.log("Total Budget: " + budget.toFixed(2));
console.log("First Expense: " + expense1.toFixed(2));
console.log("Second Expense: " + expense2.toFixed(2));
console.log("Third Expense: " + expense3.toFixed(2));
console.log("Total Expenses: " + totalExpenses.toFixed(2));
console.log("Remaining Balance: " + remainingBalance.toFixed(2));
console.log("===================================");

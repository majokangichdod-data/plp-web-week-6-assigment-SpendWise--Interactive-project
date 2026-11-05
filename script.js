const MONTHLY_BUDGET = 50000;
const STORAGE_KEY = "spendwise-expenses-v1";
const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const dateFormatter = new Intl.DateTimeFormat("en-KE", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalExpensesDisplay = document.getElementById("total-expenses");
const balanceDisplay = document.getElementById("balance");
const budgetDisplay = document.getElementById("budget");
const feedback = document.getElementById("feedback");
const clearButton = document.getElementById("clear-expenses");

function loadExpenses() {
  try {
    const savedExpenses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(savedExpenses)) return [];

    return savedExpenses.filter((expense) =>
      expense && typeof expense.id === "string" &&
      typeof expense.name === "string" &&
      Number.isFinite(expense.amount) && expense.amount > 0 &&
      typeof expense.category === "string" &&
      typeof expense.date === "string"
    );
  } catch {
    showFeedback("Saved expenses could not be read. You can still add expenses for this visit.", true);
    return [];
  }
}

let expenses = loadExpenses();

function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch {
    showFeedback("Changes are visible, but could not be saved in this browser.", true);
    return false;
  }
}

function showFeedback(message, isError = false) {
  feedback.textContent = message;
  feedback.classList.toggle("is-error", isError);
}

function renderDashboard() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = MONTHLY_BUDGET - total;

  budgetDisplay.textContent = currency.format(MONTHLY_BUDGET);
  totalExpensesDisplay.textContent = currency.format(total);
  balanceDisplay.textContent = currency.format(balance);
  balanceDisplay.classList.toggle("over-budget", balance < 0);
  expenseList.replaceChildren();

  if (expenses.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "empty-state";
    cell.textContent = "No expenses yet. Add your first expense above to get started.";
    row.appendChild(cell);
    expenseList.appendChild(row);
  } else {
    for (const expense of [...expenses].reverse()) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = expense.name;
      const amountCell = document.createElement("td");
      amountCell.textContent = currency.format(expense.amount);
      amountCell.className = "amount-cell";
      const categoryCell = document.createElement("td");
      categoryCell.textContent = expense.category;
      const dateCell = document.createElement("td");
      const parsedDate = new Date(`${expense.date}T00:00:00`);
      dateCell.textContent = Number.isNaN(parsedDate.getTime()) ? expense.date : dateFormatter.format(parsedDate);
      const actionCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", `Delete ${expense.name}`);
      deleteButton.addEventListener("click", () => {
        expenses = expenses.filter((item) => item.id !== expense.id);
        saveExpenses();
        renderDashboard();
        showFeedback("Expense deleted.");
      });
      actionCell.appendChild(deleteButton);
      row.append(nameCell, amountCell, categoryCell, dateCell, actionCell);
      expenseList.appendChild(row);
    }
  }

  if (balance < 0) {
    showFeedback("You are over your monthly budget. Review your expenses.", true);
  } else if (balance === 0) {
    showFeedback("You have used your entire monthly budget.", true);
  } else if (total >= MONTHLY_BUDGET * 0.8) {
    showFeedback("Heads up: you have spent at least 80% of your monthly budget.");
  } else if (!feedback.classList.contains("is-error")) {
    showFeedback(expenses.length ? "You are within your monthly budget." : "Add an expense to start tracking your budget.");
  }
}

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = expenseName.value.trim();
  const amount = Number(expenseAmount.value);
  const category = expenseCategory.value;

  if (!name) {
    showFeedback("Please enter an expense name.", true);
    expenseName.focus();
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    showFeedback("Enter an amount greater than zero.", true);
    expenseAmount.focus();
    return;
  }
  if (!category) {
    showFeedback("Please choose a category.", true);
    expenseCategory.focus();
    return;
  }

  expenses.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    amount: Math.round(amount * 100) / 100,
    category,
    date: new Date().toISOString().slice(0, 10)
  });
  saveExpenses();
  expenseForm.reset();
  renderDashboard();
  showFeedback("Expense added successfully.");
});

clearButton.addEventListener("click", () => {
  if (expenses.length === 0) {
    showFeedback("There are no expenses to clear.");
    return;
  }
  if (!window.confirm("Clear all saved expenses? This cannot be undone.")) return;

  expenses = [];
  saveExpenses();
  renderDashboard();
  showFeedback("All expenses cleared.");
});

renderDashboard();

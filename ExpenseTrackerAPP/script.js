document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  function calculateTotal() {
    return expenses.reduce((sum, currVal) => {
      return sum + currVal.amount;
    }, 0);
  }

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      updateTotal();
      renderExpenses();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const list = document.createElement("li");
      list.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button data-id="${expense.id}">Delete</button>
      `;

      expenseList.appendChild(list);
    });
  }

  expenseList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const id = parseInt(event.target.getAttribute("data-id"));
      expenses = expenses.filter((item) => item.id !== id);
      renderExpenses();
      saveExpensesToLocal();
    }
  });
});

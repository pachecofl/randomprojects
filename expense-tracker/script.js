"use restrict";

//DOM Elements
const totalBalance = document.querySelector(".total-balance");
const totalIncome = document.querySelector(".income");
const totalExpense = document.querySelector(".expense");

const expenseList = document.querySelector(".expence-history");

const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");

const btnAddTransaction = document.querySelector(".add-transation");

const body = document.querySelector("body");

//Objects and variables
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
const expenses = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// [
//   {
//     text: "Camera",
//     amount: -300,
//     id: 1,
//   },
//   {
//     text: "Salary",
//     amount: 2000,
//     id: 2,
//   },
//   {
//     text: "Trip",
//     amount: -800,
//     id: 3,
//   },
// ];
let itemsNums = 1;
//Functions
function calcDisplayBalance() {
  //calculate
  const expenseTotal = Math.abs(
    expenses.filter((item) => item.amount < 0).reduce((acc, cur) => acc + cur.amount, 0)
  );
  const incomeTotal = expenses
    .filter((item) => item.amount > 0)
    .reduce((acc, cur) => acc + cur.amount, 0);
  const balance = incomeTotal - expenseTotal;

  //display
  totalBalance.textContent = `${balance >= 0 ? "$" : "-$"}${Math.abs(balance).toFixed(2)}`;
  totalIncome.textContent = `$${incomeTotal.toFixed(2)}`;
  totalExpense.textContent = `$${expenseTotal.toFixed(2)}`;
}
function displayExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (expense) {
    //add the event listener is possible like that just the way we are addind the other values
    expenseList.innerHTML += `
    <li class="${expense.amount > 0 ? "plus" : "minus"}" value="${expense.id}">
      <span class="delete" onclick="deleteItem(${expense.id})">x</span>
      <p>${expense.text}</p>
      <p>${expense.amount}</p>
    </li>
    `;
  });
  updateLocalStorage();
}

function deleteItem(id) {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);
  expenses.splice(expenseIndex, 1);
  displayExpenses();
  calcDisplayBalance();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(expenses));
}

//Event listeners
//add transation
btnAddTransaction.addEventListener("click", function (e) {
  e.preventDefault();
  //input values
  const text = textInput.value;
  const amount = Number(amountInput.value);
  // const id = itemsNums;
  const id = Number(`${expenses.length >= 1 ? expenses[expenses.length - 1].id + 1 : 1}`);
  // itemsNums++;
  //check if entry is valid
  if (text && amount) {
    expenses.push({
      text,
      amount,
      id,
    });
    displayExpenses();
    calcDisplayBalance();
  }
  textInput.value = amountInput.value = "";
});

//Init
displayExpenses();
calcDisplayBalance();

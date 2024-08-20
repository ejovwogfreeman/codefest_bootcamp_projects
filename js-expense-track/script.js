const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add Transactions
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a expense and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
      type: type.value,
      date: new Date().toDateString() + " | " + new Date().toLocaleTimeString(),
    };

    console.log(transaction);

    transactions.push(transaction);

    addTransactionToDOM(transaction);

    updateLocalStoarge();

    updateValues();

    text.value = "";
    amount.value = "";
  }
}

// Add Transactions To The DOM List
function addTransactionToDOM(transaction) {
  // Get the sign plus or minus
  const sign = transaction.type === "income" ? "+" : "-";
  const item = document.createElement("li");

  // Add classes based on the value
  item.classList.add(transaction.type === "income" ? "plus" : "minus");
  item.innerHTML = `<div class='trx'><strong>
        ${transaction.text}</strong><span>${sign}${Math.abs(
    transaction.amount
  )}</span></div>
  <small style='font-size:12px'>${transaction.date}</small>
  <button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">x</button>
    `;
  list.appendChild(item);
}

// Update the balance, income and expenses
function updateValues() {
  // Calculate the total balance
  const total = transactions
    .map(
      (transaction) =>
        transaction.amount * (transaction.type === "expense" ? -1 : 1)
    )
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // Calculate the total income
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .map((transaction) => transaction.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // Calculate the total expenses
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => transaction.amount)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  balance.innerText = `₦${numberWithCommas(total)}`;
  money_plus.innerText = `₦${numberWithCommas(income)}`;
  money_minus.innerText = `₦${numberWithCommas(expense)}`;
}

// Delete The Transactions by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStoarge();

  init();
}

// Update The Local Storage
function updateLocalStoarge() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize the App
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

// Generate a Random ID
function generateId() {
  return Math.floor(Math.random() * 100000000);
}

form.addEventListener("submit", addTransaction);

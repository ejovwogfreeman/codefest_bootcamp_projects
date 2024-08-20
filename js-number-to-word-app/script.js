const form = document.getElementById("form");
const num = document.getElementById("num");
const converted = document.getElementById("converted");

const ones = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
};

const prefixes = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety",
};

function convertNumber(num) {
  if (num === 0) return "zero";

  if (num < 20) return ones[num];

  if (num < 100)
    return (
      prefixes[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
    );

  if (num < 1000) {
    return (
      ones[Math.floor(num / 100)] +
      " hundred" +
      (num % 100 ? " and " + convertNumber(num % 100) : "")
    );
  }

  if (num < 10000) {
    return (
      convertNumber(Math.floor(num / 1000)) +
      " thousand" +
      (num % 1000 ? " " + convertNumber(num % 1000) : "")
    );
  }

  if (num < 100000) {
    return (
      convertNumber(Math.floor(num / 1000)) +
      " thousand" +
      (num % 1000 ? " " + convertNumber(num % 1000) : "")
    );
  }

  if (num < 1000000) {
    return (
      convertNumber(Math.floor(num / 1000)) +
      " thousand" +
      (num % 1000 ? " " + convertNumber(num % 1000) : "")
    );
  }

  if (num === 1000000) return "one million";

  return "";
}

form.onsubmit = (event) => {
  event.preventDefault();
  const value = +num.value;

  if (value < 0 || value > 1000000) {
    converted.innerHTML = "Number out of range";
    return;
  }

  converted.innerHTML = convertNumber(value);
};

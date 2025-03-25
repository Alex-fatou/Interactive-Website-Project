// progress bar
let progressBar = document.getElementById("progress");
let percentageLabel = document.getElementById("percentage");

let percentage = 0;
let interval = setInterval(function () {
  if (percentage < 98) {
    percentage++;
    progressBar.style.width = percentage + "%";
    percentageLabel.innerText = percentage + "%";
  } else {
    clearInterval(interval);
  }
}, 50);

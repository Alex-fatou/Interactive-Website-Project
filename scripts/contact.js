// email Regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const contactForm = document.forms["contact-form"];

contactForm.addEventListener("submit", function (submitEvent) {
  submitEvent.preventDefault();

  console.log("Form Data:", {
    Username: contactForm.username.value,
    Email: contactForm.email.value,
    Phone: contactForm.phone.value,
    Address: contactForm.Address.value,
    Message: contactForm.message.value,
  });

  const username = contactForm.username;
  const email = contactForm.email;
  const emailConfirm = contactForm["email-confirm"];
  const phone = contactForm.phone;
  const message = contactForm.message;

  const emailFormatError = document.getElementById("email-format-error");
  const emailConfirmFormatError = document.getElementById(
    "email-confirm-format-error"
  );
  const emailMatchError = document.getElementById("email-match-error");
  const phoneError = document.getElementById("phone-error");
  const emailXssError = document.getElementById("email-xss-error");
  const emailMultipleAtError = document.getElementById(
    "email-multiple-at-error"
  );

  let isValid = true;

  // email check
  if (!email.value.match(emailRegex)) {
    emailFormatError.classList.remove("hidden");
    isValid = false;
  } else {
    emailFormatError.classList.add("hidden");
  }

  // email check for &, # etc
  const xssPattern = /<|>|&|%|#|--|\/\*/;
  if (xssPattern.test(email.value)) {
    emailXssError.classList.remove("hidden");
    isValid = false;
  }

  // email check for multiple @
  const atCount = (email.value.match(/@/g) || []).length;
  if (atCount > 1) {
    emailMultipleAtError.classList.remove("hidden");
    isValid = false;
  }

  // Confirmation email check"
  if (!emailConfirm.value.match(emailRegex)) {
    emailConfirmFormatError.classList.remove("hidden");
    isValid = false;
  } else {
    emailConfirmFormatError.classList.add("hidden");
  }

  // chech if mail is the same
  if (email.value !== emailConfirm.value) {
    emailMatchError.classList.remove("hidden");
    isValid = false;
  } else {
    emailMatchError.classList.add("hidden");
  }

  // phone chech
  const phonePattern = /^0030\d{10}$/;
  if (!phone.value.match(phonePattern)) {
    phoneError.classList.remove("hidden");
    isValid = false;
  } else {
    phoneError.classList.add("hidden");
  }

  // submit form if it is correct
  if (isValid) {
    console.log("Form is valid, submitting...");
  } else {
    console.log("Form contains errors, please fix them.");
  }
});

// mail check
const emailInput = contactForm.email;
const emailConfirmInput = contactForm["email-confirm"];
const phoneInput = contactForm.phone;

function validateEmailFormat() {
  const emailFormatError = document.getElementById("email-format-error");
  emailFormatError.classList.toggle(
    "hidden",
    emailInput.value.match(emailRegex)
  );
}

function validateEmailConfirmFormat() {
  const emailConfirmFormatError = document.getElementById(
    "email-confirm-format-error"
  );
  emailConfirmFormatError.classList.toggle(
    "hidden",
    emailConfirmInput.value.match(emailRegex)
  );
}

function validateEmailMatch() {
  const emailMatchError = document.getElementById("email-match-error");
  emailMatchError.classList.toggle(
    "hidden",
    emailInput.value === emailConfirmInput.value
  );
}

// phone check
function validatePhoneFormat() {
  const phoneError = document.getElementById("phone-error");
  const phonePattern = /^0030\d{10}$/;
  phoneError.classList.toggle("hidden", phonePattern.test(phoneInput.value));
}

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");

  if (!this.value.startsWith("0030")) {
    this.value = "0030";
  }

  if (this.value.length > 14) {
    this.value = this.value.slice(0, 14);
  }
});

emailInput.addEventListener("blur", validateEmailFormat);
emailConfirmInput.addEventListener("blur", validateEmailConfirmFormat);
emailConfirmInput.addEventListener("blur", validateEmailMatch);
phoneInput.addEventListener("blur", validatePhoneFormat);

// username check
function validateUsername() {
  const username = contactForm.username.value.trim();

  document
    .getElementById("min-length-username")
    .classList.toggle("hidden", username.length >= 5);
  document
    .getElementById("max-length-username")
    .classList.toggle("hidden", username.length <= 10);
  document
    .getElementById("no-space-username")
    .classList.toggle("hidden", !username.includes(" "));
}

const usernameInput = contactForm.username;
usernameInput.addEventListener("blur", validateUsername);

usernameInput.addEventListener("focus", () => {
  document
    .querySelectorAll(".error-message")
    .forEach((span) => span.classList.add("hidden"));
});

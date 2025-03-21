var form = document.getElementById("form");
var email = document.getElementById("email");
var pass = document.getElementById("password");
var email_error = document.getElementById("email_e");
var pass_error = document.getElementById("pass_e");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = email.value;
  const passValue = pass.value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = null; 
  
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === emailValue) {
      user = users[i]; 
      break; 
    }
  }

 
  if (user) {
    if (user.password === passValue) {
      pass_error.style.display = "none";
      form.submit();
    } else {
      pass_error.style.display = "block"; 
    }
  } else {
    email_error.style.display = "block"; 
  }
});




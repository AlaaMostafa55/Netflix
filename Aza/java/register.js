var form = document.getElementById("form");
var email = document.getElementById("email");
var pass = document.getElementById("password");
var email_error = document.getElementById("email_e");
var pass_error = document.getElementById("pass_e");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const emailValue = email.value;
  const passValue = pass.value;

  var emailPattern = /^[a-zA-Z0-9]{5,}@gmail\.com$/g;

  if (emailPattern.test(emailValue)) {
    email_error.style.display = "none";
  } else {
    email_error.style.display = "block";
    return;
  }

  const passPattern = /^[a-zA-Z0-9]{9,}$/g;

  if (!passPattern.test(passValue)) {
    pass_error.style.display = "block";
    return; 
  } else {
    pass_error.style.display = "none";
  }
  
  function userExists(users, emailValue) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailValue) {
        return true;
      }
    }
    return false;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (userExists(users, emailValue)) {
    alert("email already exists");
  } else {
    users.push({ email: emailValue, password: passValue });
    localStorage.setItem('users', JSON.stringify(users));
    
    form.submit(); 
  }
});

function press(event) {
  if (event.target.value.length >= 20) {
    event.preventDefault();
    alert("The maximum length is 20 characters.");
  }
}

email.addEventListener('keypress', press);
pass.addEventListener('keypress', press);

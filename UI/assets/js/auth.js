const spin = document.querySelector('.spin');
const errorMessage = document.querySelector('.error');

function authenticateUser(userInfo, endpoint) {
  const url = `https://epic-email.herokuapp.com/api/v2/auth/${endpoint}`;

  spin.style.display = 'flex';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        spin.style.display = 'none';
        const { token } = data.data[0];
        localStorage.setItem('token', token);
        if (window.location.href.includes('register')) {
          window.location.href = './login.html';
        } else {
          window.location.href = './home.html';
        }
      } else {
        spin.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = data.error;
      }
    })
    .catch(error => {
      throw error;
    });
}

document.querySelector('.auth-form').addEventListener('submit', event => {
  event.preventDefault();

  let endpoint = 'login';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userDetails = {
    email, password,
  };

  if (window.location.href.includes('register')) {
    endpoint = 'signup';

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const phonenumber = document.getElementById('phonenumber').value;

    Object.assign(userDetails, {
      firstname, lastname, confirmpassword, phonenumber,
    });
  }

  authenticateUser(userDetails, endpoint);
});

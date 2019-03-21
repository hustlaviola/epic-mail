function authenticateUser(userInfo, endpoint) {
  console.log(userInfo);
  const url = `https://epic-email.herokuapp.com/api/v2/auth/${endpoint}`;
  const element = document.querySelector('button[type="submit"]');
  const defaultText = element.textContent;
  const defaultPage = './index.html';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => {
      console.log(response);
      response.json();
    })
    .then(data => {
      console.log(data);
      if (data.status === 200 || data.status === 201) {
        const { token } = data.data[0];
        localStorage.setItem('token', token);
        window.location.href = defaultPage;
      }
    })
    .catch(error => {
      console.log(error);
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

  if (window.location.href.includes('signup')) {
    endpoint = 'register';

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

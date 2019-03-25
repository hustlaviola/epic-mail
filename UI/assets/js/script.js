/* eslint-disable no-unused-vars */
const messageContainer = document.querySelector('.message-container');
const messageBoxes = document.querySelectorAll('.message-box');
const threadBox = document.querySelector('.thread-box');
const chatForm = document.getElementById('chat-form');
const boxBtn = document.getElementById('box-btn');

if (window.innerWidth <= 768) {
  messageBoxes.forEach(box => {
    box.addEventListener('click', () => {
      messageContainer.style.width = 0;
      threadBox.style.display = 'inherit';
      threadBox.style.marginLeft = 0;
      boxBtn.style.display = 'block';
      chatForm.style.width = '100%';
      chatForm.style.borderLeft = '5px solid #10a9f0';
    });
  });
}

boxBtn.addEventListener('click', event => {
  event.preventDefault();
  threadBox.style.display = 'none';
  boxBtn.style.display = 'none';
  messageContainer.style.width = '100%';
});

const sidepanel = document.getElementById('sidepanel');

const openNav = () => {
  sidepanel.style.width = '250px';
  sidepanel.style.position = 'fixed';
};

const closeNav = () => {
  sidepanel.style.width = '0';
};

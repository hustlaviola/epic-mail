const compose = document.getElementById('compose');
const inbox = document.getElementById('inbox');
const draft = document.getElementById('draft');
const sent = document.getElementById('sent');
const group = document.getElementById('group');
const groupChat = document.getElementById('group-chat');
const thread = document.getElementById('thread');

const spanCompose = document.getElementById('span-compose');
const spanInbox = document.getElementById('span-inbox');
const spanDraft = document.getElementById('span-draft');
const spanSent = document.getElementById('span-sent');
const spanGroup = document.getElementById('span-group');

const sidepanel = document.getElementById("sidepanel");

const messageContainer = document.querySelector('.message-container');
const messageBoxes = document.querySelectorAll('.message-box');
const threadBox = document.querySelector('.thread-box');
const chatForm = document.getElementById('chat-form');
const boxBtn = document.getElementById('box-btn');

boxBtn.addEventListener('click', () => {
  threadBox.style.display = 'none';
  boxBtn.style.display = 'none';
  messageContainer.style.width = '100%';
})

if(window.innerWidth <= 768) {
  messageBoxes.forEach(box => {
    box.addEventListener('click', () => {
      messageContainer.style.width = 0;
      threadBox.style.display = 'inherit';
      threadBox.style.marginLeft = 0;
      boxBtn.style.display = 'block';
      chatForm.style.width = '100%';
      chatForm.style.borderLeft = "5px solid #10a9f0";
    })
  });
}

const reset = () => {
  compose.style.display = 'none';
  inbox.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  group.style.display = 'none';
  groupChat.style.display = 'none';
  thread.style.display = 'none';

  if (spanCompose.classList.contains('current')) {
    spanCompose.classList.remove('current');
  } else if (spanInbox.classList.contains('current')) {
    spanInbox.classList.remove('current');
  } else if (spanDraft.classList.contains('current')) {
    spanDraft.classList.remove('current');
  } else if (spanSent.classList.contains('current')) {
    spanSent.classList.remove('current');
  } else if (spanGroup.classList.contains('current')) {
    spanGroup.classList.remove('current');
  }
};

const openNav = () => {
  sidepanel.style.width = "250px";
  sidepanel.style.position = "fixed";
};

const closeNav = () => {
  sidepanel.style.width = "0";
};

const newGroup = document.getElementById('create-group');
const addUsers = document.getElementById('add-users');

const joinGroupChat = document.getElementById('join-group-chat');

const displayCreateGroup = () => {
  addUsers.style.display = 'none';
  newGroup.style.display = 'block';
};

const display = (id, subId) => {
  reset();
  closeNav();

  document.getElementById(id).style.display = 'block';
  document.getElementById(subId).className = 'current';
};

joinGroupChat.addEventListener('click', e => {
  e.preventDefault();

  reset();

  groupChat.style.display = 'block';
  spanGroup.className = 'current';
});
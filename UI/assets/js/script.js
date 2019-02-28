const compose = document.getElementById('compose');
const inbox = document.getElementById('inbox');
const draft = document.getElementById('draft');
const sent = document.getElementById('sent');
const group = document.getElementById('group')
const groupChat = document.getElementById('group-chat');
const thread = document.getElementById('thread');
const pl = document.getElementById('pl');

const openNav = () => {
  document.getElementById("sidepanel").style.width = "100%";
}

const closeNav = () => {
  document.getElementById("sidepanel").style.width = "0";
}

const newGroup = document.getElementById('create-group');
const addUsers = document.getElementById('add-users');

const joinGroupChat = document.getElementById('join-group-chat');

const displayCreateGroup = () => {
  addUsers.style.display = 'none';
  newGroup.style.display = 'block';
};

joinGroupChat.addEventListener('click', e => {
  e.preventDefault();

  compose.style.display = 'none';
  inbox.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  group.style.display = 'none';
  thread.style.display = 'none';
  groupChat.style.display = 'block';
})

const spanCompose = document.getElementById('span-compose');
const spanInbox = document.getElementById('span-inbox');
const spanDraft = document.getElementById('span-draft');
const spanSent = document.getElementById('span-sent');
const spanGroup = document.getElementById('span-group');

const displayCompose = () => {
  inbox.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  group.style.display = 'none';
  thread.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  compose.style.display = 'block';

  if (spanInbox.classList.contains('current')) {
    spanInbox.classList.remove('current');
  } else if (spanDraft.classList.contains('current')) {
    spanDraft.classList.remove('current');
  } else if (spanSent.classList.contains('current')) {
    spanSent.classList.remove('current');
  } else if (spanGroup.classList.contains('current')) {
    spanGroup.classList.remove('current');
  }

  spanCompose.className = 'current';
};

const displayInbox = () => {
  compose.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  group.style.display = 'none';
  thread.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  inbox.style.display = 'block';

  if (spanCompose.classList.contains('current')) {
    spanCompose.classList.remove('current');
  } else if (spanDraft.classList.contains('current')) {
    spanDraft.classList.remove('current');
  } else if (spanSent.classList.contains('current')) {
    spanSent.classList.remove('current');
  } else if (spanGroup.classList.contains('current')) {
    spanGroup.classList.remove('current');
  }

  spanInbox.className = 'current';
};

const displayDraft = () => {
  compose.style.display = 'none';
  inbox.style.display = 'none';
  sent.style.display = 'none';
  thread.style.display = 'none';
  group.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  draft.style.display = 'block';

  if (spanCompose.classList.contains('current')) {
    spanCompose.classList.remove('current');
  } else if (spanInbox.classList.contains('current')) {
    spanInbox.classList.remove('current');
  } else if (spanSent.classList.contains('current')) {
    spanSent.classList.remove('current');
  } else if (spanGroup.classList.contains('current')) {
    spanGroup.classList.remove('current');
  }

  spanDraft.className = 'current';
};

const displaySent = () => {
  compose.style.display = 'none';
  inbox.style.display = 'none';
  draft.style.display = 'none';
  group.style.display = 'none';
  thread.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  sent.style.display = 'block';

  if (spanCompose.classList.contains('current')) {
    spanCompose.classList.remove('current');
  } else if (spanInbox.classList.contains('current')) {
    spanInbox.classList.remove('current');
  } else if (spanDraft.classList.contains('current')) {
    spanDraft.classList.remove('current');
  } else if (spanGroup.classList.contains('current')) {
    spanGroup.classList.remove('current');
  }

  spanSent.className = 'current';
};

const displayGroup = () => {
  compose.style.display = 'none';
  inbox.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  thread.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  group.style.display = 'block';

  if (spanCompose.classList.contains('current')) {
    spanCompose.classList.remove('current');
  } else if (spanInbox.classList.contains('current')) {
    spanInbox.classList.remove('current');
  } else if (spanDraft.classList.contains('current')) {
    spanDraft.classList.remove('current');
  } else if (spanSent.classList.contains('current')) {
    spanSent.classList.remove('current');
  }

  spanGroup.className = 'current';
};

const displayThread = () => {
  compose.style.display = 'none';
  inbox.style.display = 'none';
  draft.style.display = 'none';
  sent.style.display = 'none';
  group.style.display = 'none';
  groupChat.style.display = 'none';

  closeNav();

  thread.style.display = 'block';
};
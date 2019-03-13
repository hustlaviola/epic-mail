const groupContainer = document.getElementById('group-container');
const groupInfo = document.getElementById('group-info');
const groupBoxes = document.querySelectorAll('.group-box');

if (window.innerWidth <= 768) {
  groupContainer.style.paddingLeft = 0;
  groupBoxes.forEach(box => {
    box.addEventListener('click', () => {
      groupContainer.style.width = 0;
      groupInfo.style.display = 'inherit';
      groupInfo.style.marginLeft = 0;
      groupInfo.style.paddingLeft = 0;
      adminHead.style.display = 'flex';
      if (window.innerHeight < 640) {
        groupInfo.style.marginTop = '100px';
      }
    })
  });
}

const createBtn = document.getElementById('create-btn');
const newGroup = document.getElementById('new-group');
const infoBox = document.getElementById('info-box');

createBtn.addEventListener('click', event => {
  event.preventDefault();
  infoBox.classList.add('hidden');
  newGroup.classList.remove('hidden');
})

const cancelBtn = document.getElementById('cancel-btn');

cancelBtn.addEventListener('click', event => {
  event.preventDefault();
  newGroup.classList.add('hidden');
  infoBox.classList.remove('hidden');
})

const backBtn = document.getElementById('back-btn');
const adminHead = document.querySelector('.admin-head');

backBtn.addEventListener('click', event => {
  event.preventDefault();
  adminHead.style.display = 'none';
  groupInfo.style.display = 'none';
  groupContainer.style.width = '100%';
})

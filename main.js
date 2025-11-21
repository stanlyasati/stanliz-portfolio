/*---------
    NAVBAR 
  ---------*/
// toggleMenu .show class
const menu = document.querySelector('.menu');
const menuIcon = document.querySelector('.menu-icon');
const menuLinks = document.querySelectorAll('.menu a')

function _toggleMenu () {
  menu.classList.toggle('show');
  menuIcon.classList.toggle('show');
}

menuIcon.addEventListener('click', _toggleMenu);
menuLinks.forEach((link)=>link.addEventListener('click', _toggleMenu));


/*-----------------
    ABOUT SECTION
  -----------------*/
// showcasing profession 
const professionArray = ['Architectural', 'Structural'];
const profession = document.querySelector('.profession-text');

let index = 0;

function f_changeProfession() {
  profession.textContent = professionArray[index];
  index++;
  if (index >= professionArray.length) {
    index = 0;
  }
}
f_changeProfession();
setInterval(f_changeProfession, 2000);


// Path to your CV
const cvFile = '/assets/Stanley_Asati_CV.pdf';

// View CV button
const viewCVBtn = document.getElementById('viewCV');
viewCVBtn.addEventListener('click', function(e) {
  e.preventDefault();
  window.open(cvFile, '_blank'); // Open CV in a new tab
});

// Download CV button
const downloadCVBtn = document.getElementById('downloadCV');
downloadCVBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const link = document.createElement('a');
  link.href = cvFile;
  link.download = 'Stanley_Asati_CV.pdf'; // File name when downloaded
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


/*--------------------
    PROJECTS SECTION
  --------------------*/
  
const cardWrapper = document.querySelector('#projects .wrapper');
const cardTemplate = document.querySelector('#card-template');

// function 1: create and append a project card
function f_addProjectCard(project, index) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.id = 'project-' + (index + 1);
  newCard.style.display = '';

  newCard.querySelector('.card-title').textContent = project.title;
  newCard.querySelector('.card-snippet').textContent = project.snippet;

  const img = newCard.querySelector('.card-image');
  img.src = project.image;
  img.alt = project.title;

  newCard.querySelectorAll('.card-link').forEach(link => link.href = project.url);

  cardWrapper.appendChild(newCard);
}
// function 2: load projects JSON and create cards
function f_loadProjects() {
  fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
      projects.forEach((project, i) => f_addProjectCard(project, i));
    })
    .catch(err => alert('Error loading projects.json. Check the file path or format.'));
}
// run it
f_loadProjects();
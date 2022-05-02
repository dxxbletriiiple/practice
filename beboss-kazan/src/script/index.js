"use strict";

const hamburger = document.querySelector('.hamburger'),
	sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', ()=> {
	hamburger.classList.toggle('active');
	sidebar.classList.toggle('active');
});

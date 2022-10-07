/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';
/* Get DOM Elements */

const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postDesc = document.getElementById('post-description');

/* State */
let error = null;
let post = [];
/* Events */
window.addEventListener('load', async () => {
    const searchPerams = new URLSearchParams(location.search);
    const id = searchPerams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    } else {
        displayPost();
    }
});

/* Display Functions */
function displayPost() {
    postTitle.textContent = post.title;
    postDesc.textContent = post.description;
    postImage.src = post.image_url;
    postImage.alt = `${post.title} image`;
    if (post.image_url.length <= 115) {
        postImage.src = '/assets/placeholder-image.png';
    }
}

function displayError() {
    if (error) {
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

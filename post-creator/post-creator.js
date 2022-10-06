/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPost } from '../fetch-utils.js';
/* Get DOM Elements */

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
/* State */

let error = null;

/* Events */
postForm.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const post = {
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        // image_url: URL,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        // location.assign('/');
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

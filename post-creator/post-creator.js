/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';
/* Get DOM Elements */

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

/* State */

let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder-image.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const imageFile = formData.get('image_url');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `reddit_posts/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('reddit-post-images', imagePath, imageFile);

    const post = {
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPost } from '../fetch-utils.js';
import { createComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';
/* Get DOM Elements */

const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postDesc = document.getElementById('post-description');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');

/* State */
let error = null;
let post = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

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
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);
    const insertComment = {
        text: formData.get('comment'),
        post_id: post.id,
    };

    const response = await createComment(insertComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        post.comments.unshift(comment);
        displayComments();
        addCommentForm.reset();
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

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment, post.id);
        commentList.append(commentEl);
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

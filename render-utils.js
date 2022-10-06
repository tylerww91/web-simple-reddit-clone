export function renderPost(post) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/post/?id=${post.id}`;

    const img = document.createElement('img');
    img.src = post.image_url;
    if (!post.image_url) {
        img.src = '/assets/placeholder-image.png';
    }

    const h2 = document.createElement('h2');
    h2.textContent = post.title;
    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(post.category);
    h2.append(span);

    const timeStamp = document.createElement('p');
    timeStamp.textContent = post.created_at;

    const desc = document.createElement('p');
    desc.textContent = post.description;

    a.append(h2, desc, img, timeStamp);
    li.append(a);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'gaming') return '🎮';
    if (category === 'pets') return '🐶';
    if (category === 'food') return '🍕';
    if (category === 'travel') return '✈';
    if (category === 'finance') return '📈';
    if (category === 'tech') return '🤖';
}

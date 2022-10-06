const SUPABASE_URL = 'https://ayxbykenathjsislhrcb.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5eGJ5a2VuYXRoanNpc2xocmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ5MDA1OTgsImV4cCI6MTk4MDQ3NjU5OH0.KDGUAfxfPEnS_poz5BMztOjfb7dee67tqxn6_bnpm9k';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createPost(post) {
    return await client.from('reddit_posts').insert(post);
}

export async function getPosts() {
    return await client.from('reddit-posts').select('*');
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}

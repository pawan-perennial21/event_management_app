type Post = {
    id: string;
    title: string;
    description: string;
    location: string;
    date: any; // Assuming the date is a string in the format 'yyyy-mm-dd'
    image: string;
    isFeatured: boolean;
};

let posts: Post[] = [];

export const getPosts = () => posts
export const addPosts = (post: Post) => {
  return posts.push(post)
}
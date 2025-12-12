require("./db/db.connect.js")

const Post = require("./models/post.model");
const User = require("./models/user.model");

const useData = {
    name: "John",
    email: "john@gmail.com"
}

const addUser = async () => {
    try{
        const newUser = new User(useData);
        await newUser.save();
    }catch(error){
        console.log("Error: ", error)
    }
}

/* addUser(); */

const postData = {
    title: "Greetings",
    content: "Have a good day!",
    author: "6927d3f0ecf34182f0559706"
}

const addPost = async() => {
    try{
        const newPost = new Post(postData);
        await newPost.save();
        console.log("Post added successfully.")
    }catch(error){
        console.log("Error",error)
    }
}

// addPost();

const getAllPosts = async() =>{
    try{
        const allPosts = await Post.find().populate("author");
        console.log("All Posts: ", allPosts)
    }catch(error){
        console.log("Error",error)
    }
}

getAllPosts();



const expres = require("express");
const Blog = require("../models/Blog");


const router = expres.Router();

// Create a new blog post
router.post("/",async(req,res)=>{
    try {
        const {title,content,image} = req.body;
        const newBlog = new Blog({title,content,image});
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// Get all blog posts
router.get("/",async(req,res)=>{
    try {
        const blogs = await Blog.find()
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})


// Get a single blog post by ID
router.get("/:id",async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
      if(!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})


// Update a blog post by ID
router.put("/:id",async(req,res)=>{
    try {
        const {title,content,image} = req.body;
        const updateBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title,content,image},
            {new:true}
        );
        if(!updateBlog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.json(updateBlog)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.delete("/:id",async(req,res)=>{
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
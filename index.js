import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Sheershah",
    description:
      "Indian Hindi-language biographical war film based on the life of Vikram Batra, killed in action in the Kargil War.",
    director: "Vishnuvardhan",
    releasedate: "03 July 2021",
    category:"Biographical War",
    averagerating:"3.5/5",
  },
  {
    id: 2,
    title: "Dada",
    description:
      "Dada(Father) is an emotional drama about a young man dealing with becoming a parent,out of the blue,with a lot of maturity",
    director: "Ganesh K. Babu",
    releasedate: "10 February 2023",
    category:"Romantic,Comedy,Drama",
    averagerating:"3.8/5",
  },
  {
    id: 3,
    title: "Sir",
    description:
      "Vaathi is a 2023 Indian period action drama film written and directed by Venky Atluri. The film was shot simultaneously in Tamil and Telugu with the latter titled as Sir and produced by Sithara Entertainments and Fortune Four Cinemas",
    director: "Venky Atluri",
    releasedate: "17 February 2022",
    category:"Action,Drama",
    averagerating:"4/5",
  },
];

let lastId = 4;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    description: req.body.description,
    director: req.body.director,
    releasedate: req.body.releasedate,
    category: req.body.category,
    averagerating:req.body.averagerating,
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.description) post.description = req.body.description;
  if (req.body.director) post.director = req.body.director;
  if (req.body.releasedate) post.releasedate=req.body.releasedate;
  if (req.body.category) post.category=req.body.category;
  if (req.body.averagerating) post.averagerating=req.body.averagerating;


  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

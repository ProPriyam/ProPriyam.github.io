---
title: "The Bookworm Project"
excerpt: "A personalized multi-modal book recommendation tool. <br/><img src='/images/Project_1_image.png'>"
collection: projects
---

It is a multi-modal book recommendation tool that personalizes your reading journey. Unlike traditional systems that rely solely on ratings or genres, this tool integrates various search modalities particularly semantic for unique recommendations.

[View Project on GitHub](https://github.com/jacobp24/bookworm_rec)

I used datasets like the **Book Crossing Dataset** and **CMU Book Summary**, along with the **Google Books API** for ISBN matching, the system effectively answers questions such as "What are some books where the MC dies?" or "What are some similar Agastha Christie books?"

Developed in **Python** with **Streamlit** and **VoyageAI** for generating recommendation embeddings, the project has features like:

- Recommending books by the same author
- Identifying titles with similar plots
- Suggesting popular reads within specific genres

Right now, it is a proof of concept with a limited dataset, but it really showcases the potential of multi-modal approaches in book recommendation systems. The goal? To get a new recommendation for myself!

Key engineering highlights include **semantic search** and **database similarity KNN caching**, ensuring faster and more relevant results.

import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts on mount
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <section className=" bg-[#0f0f1b] text-white py-10">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center max-w-xl mx-auto p-8 bg-[#161622] rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-purple-500 mb-2">
              No posts available
            </h2>
            <p className="text-gray-300">
              There are currently no posts. Please check back later!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default AllPosts;

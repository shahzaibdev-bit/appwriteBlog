import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // No posts scenario (probably unauthenticated)
  if (posts.length === 0) {
    return (
      <section className="bg-[#0f0f1b] text-white flex items-center justify-center py-10 px-10">
        <Container>
          <div className="text-center max-w-xl mx-auto p-8 bg-[#161622] rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-purple-500 mb-2">
              No posts found
            </h1>
            <p className="text-gray-300">
              Login to explore awesome content from our community!
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className=" bg-[#0f0f1b] text-white px-10 py-10">
      <Container>
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Home;

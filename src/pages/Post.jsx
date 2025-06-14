import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 min-h-screen bg-gray-100">
      <Container>
        <div className="w-full flex flex-col items-center mb-6">
          <div className="relative w-full max-w-4xl border rounded-xl overflow-hidden shadow-md">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover max-h-[500px]"
            />

            {isAuthor && (
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="w-full max-w-4xl mt-6">
            <h1 className="text-3xl font-bold text-center mb-4">
              {post.title}
            </h1>
            <div className="prose max-w-none">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

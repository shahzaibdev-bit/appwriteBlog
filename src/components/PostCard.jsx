import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#2a2d3e] hover:bg-[#34374a] transition duration-300 rounded-xl p-4 shadow-lg border border-[#3d4157]">
        <div className="w-full justify-center mb-3 overflow-hidden rounded-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="object-cover w-full max-h-52 rounded-md transition duration-300 hover:scale-105"
          />
        </div>
        <h2 className="text-base font-semibold text-white truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

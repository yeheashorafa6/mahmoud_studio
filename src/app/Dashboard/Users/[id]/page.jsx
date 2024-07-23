import React from "react";
import { fetchUser } from "@/lib/data";
import { updateUser } from "@/lib/action";
import Image from "next/image";

async function SingleUserPage({ params }) {
  const { id } = params;
  const user = await fetchUser(id);

  if (!user) {
    return <div>error in page</div>;
  }

  return (
    <div className="bg-[#182237] p-5 rounded-lg mt-5">
      <form
        action={updateUser}
        method="post"
        encType="multipart/form-data"
        className="form flex flex-col gap-y-3 justify-between"
      >
        <input type="hidden" name="id" value={user.id} />
        <div className="flex justify-between">
          <input
            className="w-[45%]"
            type="text"
            name="username"
            defaultValue={user.username}
          />
          <input
            className="w-[45%]"
            type="email"
            name="email"
            defaultValue={user.email}
          />
        </div>
        <div className="flex justify-between">
          <input
            className="w-[45%]"
            name="password"
            type="password"
            defaultValue={user.password}
          />
          <select
            className="w-[45%]"
            name="isAdmin"
            defaultValue={user.isAdmin}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <textarea
          name="comment"
          defaultValue={user.comment}
          rows="11"
        ></textarea>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default SingleUserPage;

"use server"
import { revalidatePath } from "next/cache";
import { Audios, Blogger, Coustome, LatestProjects, Motion, Project, Reviews, Service, Slide, User } from "./models";
import { connectToDb } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"
import { signIn } from "@/app/auth";


// ADDING ACTION

export const addUser = async (formData) => {
  const { username, password, email, isAdmin, img, comment } =
    Object.fromEntries(formData);

  try {
     connectToDb();
     const salt =  await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)
    const user = new User({ username, password:hashedPassword, email, isAdmin, img, comment });
    await user.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/Users")
  redirect("/Dashboard/Users")
};


export const addProject = async (formData) => {
  const { title, category, desc, img } =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const project = new Project({ title, category, desc, img });
    await project.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/Projects")
  redirect("/Dashboard/Projects")
};

export const addBlogger = async (data) => {
  const { title, category, img, imgDetalis, desc, sections } = data;

  try {
    await connectToDb(); // Ensure the database connection is established

    // Create a new Blogger instance with the received data
    const blogger = new Blogger({
      title,
      category,
      img,
      imgDetalis,
      desc,
      sections,
      visits: 0 // Initialize visits to 0
    });

    // Save the new blogger to the database
    await blogger.save();

  } catch (error) {
    console.log("Error saving blogger: ", error);
  }
  // Handle post-save actions if necessary (e.g., redirect or revalidation)
  revalidatePath("/Dashboard/Blogger");
  redirect("/Dashboard/Blogger");
};

export const addMotion = async (formData) => {
  const entries = Object.fromEntries(formData.entries());
  const { title } = entries;

  const media = [];
  Object.keys(entries).forEach(key => {
    const match = key.match(/media\[(\d+)\]\[(\w+)\]/);
    if (match) {
      const index = match[1];
      const field = match[2];
      media[index] = media[index] || {};
      media[index][field] = entries[key];
    }
  });

  try {
    await connectToDb();

    const newMotion = new Motion({ title, media });
    await newMotion.save();

    return { success: true, redirect: "/Dashboard/Motion" };
  } catch (error) {
    console.error("Error adding motion:", error);
    throw new Error("Failed to add motion");
  }
};

export const addSlide = async (formData) => {
  const { title, img } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const slide = new Slide({ title, img });
    await slide.save();
  } catch (error) {
    console.error('Failed to add slide', error);
  }
  revalidatePath('/Dashboard/Slider');
  redirect('/Dashboard/Slider');
};

export const addLatestProject = async (formData) => {
  const { title, category, desc, img } =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const latestProject = new LatestProjects({ title, category, desc, img });
    await latestProject.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/LatestProjects")
  redirect("/Dashboard/LatestProjects")
};

export const addReviwes = async (formData) => {
  const { username, job, desc, img } =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const reviews = new Reviews({username, job, desc, img });
    await reviews.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/Reviwes")
  redirect("/Dashboard/Reviwes")
};

export const addAudios = async (formData) => {
  const { title,tag,audio } =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const audios = new Audios({title,tag,audio});
    await audios.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/Audio")
  redirect("/Dashboard/Audio")
};


export const addService = async (formData) => {
  const { category,  desc,img} =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const service = new Service({category,  desc,img });
    await service.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/OurService")
  redirect("/Dashboard/OurService")
};

export const addCoustome = async (formData) => {
  const { title,  link,img} =
    Object.fromEntries(formData);

  try {
     connectToDb();
    const coustome = new Coustome({ title,  link,img });
    await coustome.save();
  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/OurCustomers")
  redirect("/Dashboard/OurCustomers")
};





// DELETEING ACTION


export const deleteUser = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await User.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete user", error);
    }
  
    revalidatePath("/Dashboard/Users")
  };

export const deleteProjects = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Project.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete project", error);
    }
  
    revalidatePath("/Dashboard/Projects")
  };

export const deleteBlogger = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Blogger.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete blogger", error);
    }
  
    revalidatePath("/Dashboard/Blogger")
  };
  export const deleteMotion = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await connectToDb();
  
      await Motion.findByIdAndDelete(id);
    } catch (error) {
      console.log("Error deleting motion:", error);
      throw new Error("Failed to delete motion");
    }
  
    // إعادة التحميل بعد الحذف
    revalidatePath("/Dashboard/Motion");
  };

  export const deleteSlide = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Slide.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete user", error);
    }
  
    revalidatePath("/Dashboard/Slider")
  };

  export const deleteLatestProjects = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await LatestProjects.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete project", error);
    }
  
    revalidatePath("/Dashboard/LatestProjects")
  };
  export const deleteReviwes = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Reviews.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete Reviews", error);
    }
  
    revalidatePath("/Dashboard/Reviews")
  };
  export const deleteAudio = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Audios.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on delete Audio", error);
    }
  
    revalidatePath("/Dashboard/Audio")
  };


  export const deleteService = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Service.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on deleteService", error);
    }
  
    revalidatePath("/Dashboard/OurService")
  };

  export const deleteCoustome = async (formData) => {
    const { id} =
      Object.fromEntries(formData);
  
    try {
       connectToDb();
       await Coustome.findByIdAndDelete(id)
    } catch (error) {
      console.log("error on deleteService", error);
    }
  
    revalidatePath("/Dashboard/OurCustomers")
  };

  
// UPDATEING ACTION


export const updateUser = async (formData) => {
  const { id, username, password, email, isAdmin, comment } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { username, password, email, isAdmin, comment };

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Users");
  redirect("/Dashboard/Users");
};

export const updateProject = async (formData) => {
  const { id, title, category, img, desc } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { title, category, img, desc };

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);

    // Handle image upload if provided
    // if (img) {
      // Upload image logic here
      // updateFields.img = uploadedImageUrl;
    // }

    await Project.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Projects");
  redirect("/Dashboard/Projects");
};


export const updateBlogger = async (formData) => {
  const { id, title, category, img, imgDetalis, desc, sections, visits } = formData;

  try {
    await connectToDb();

    const updateFields = {
      title,
      category,
      img,
      imgDetalis,
      desc,
      sections: typeof sections === 'string' ? JSON.parse(sections) : sections,
      visits // Include visits in the updateFields
    };

    // Remove empty fields from updateFields
    Object.keys(updateFields).forEach((key) => 
      (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await Blogger.findByIdAndUpdate(id, updateFields, { new: true });
  } catch (error) {
    console.log("Failed to update", error);
  }

  revalidatePath("/Dashboard/Blogger");
  redirect("/Dashboard/Blogger");
};

export const updateMotion = async (formData) => {
  const { id, title, media } = Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { title, media: JSON.parse(media) };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    await Motion.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("Update failed:", error);
    throw new Error("Failed to update motion");
  }
  revalidatePath("/Dashboard/Motion");
  redirect("/Dashboard/Motion");
};

export const updateSlide = async (formData) => {
  const { id, title,img } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { title,img };

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await Slide.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Slider");
  redirect("/Dashboard/Slider");
};

export const updateLatestProject = async (formData) => {
  const { id, title, category, img, desc } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { title, category, img, desc };

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await LatestProjects.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/LatestProjects");
  redirect("/Dashboard/LatestProjects");
};

export const updateReviwes = async (formData) => {
  const { id,username, job, desc, img } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { username, job, desc, img };

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await Reviews.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Reviwes");
  redirect("/Dashboard/Reviwes");
};

export const updateAudios = async (formData) => {
  const { id,title,tag,audio} =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { title,tag,audio};

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await Audios.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Audio");
  redirect("/Dashboard/Audio");
};

export const updateService = async (formData) => {
  const { id,category,desc,img} =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = { category,desc,img};

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await Service.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/OurService");
  redirect("/Dashboard/OurService");
};

export const updateCoustome = async (formData) => {
  const { id,title,link,img} =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const updateFields = {title,link,img};

    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);


    await Coustome.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/OurCustomers");
  redirect("/Dashboard/OurCustomers");
};

  export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
      revalidatePath("/Dashboard");
      redirect("/Dashboard");
    } catch (err) {
        return "Wrong In username or password";
    }
  };
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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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
    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.log("error ", error);
  }

  revalidatePath("/Dashboard/Projects")
  redirect("/Dashboard/Projects")
};

export const addBlogger = async (data) => {
  const { title, category, img, imgDetalis, desc, bloggerContent } = data;
  console.log("Received data in addBlogger:", data);

  try {
    await connectToDb(); // Ensure the database connection is established

    // Create a new Blogger instance with the received data
    const blogger = new Blogger({
      title,
      category,
      img,
      imgDetalis,
      desc,
      bloggerContent // Initialize visits to 0
    });

    // Save the new blogger to the database
    const savedPost = await blogger.save();
    console.log("Blog post saved successfully:", savedPost);

    // Trigger the Vercel deploy hook
    await triggerDeploy();
  } catch (error) {
    console.log("Error saving blogger: ", error);
  }
  // Handle post-save actions if necessary (e.g., redirect or revalidation)
  revalidatePath("/Dashboard/Blogger");
  redirect("/Dashboard/Blogger");
};


export const addMotion = async (formData) => {
  const title = formData.get('title');
  const mediaJson = formData.get('media');
  let media = [];
  
  if (mediaJson) {
    try {
      media = JSON.parse(mediaJson);
      // تأكد من أن كل عنصر له type و url
      media = media.filter(item => item.type && item.url);
    } catch (error) {
      console.error("Error parsing media JSON:", error);
      throw new Error("Invalid media data");
    }
  }

  if (media.length === 0) {
    throw new Error("At least one media item is required");
  }

  try {
    await connectToDb();
    const newMotion = new Motion({ title, media });
    await newMotion.save();

    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.error("Error adding motion:", error);
    throw new Error("Failed to add motion: " + error.message);
  }
  revalidatePath('/Dashboard/Motion');
  redirect('/Dashboard/Motion')
};


export const addSlide = async (formData) => {
  const { title, img , imgMobile } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const slide = new Slide({ title, img ,imgMobile});
    await slide.save();

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

      // Trigger the Vercel deploy hook
    await triggerDeploy();

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
       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

       // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Users");
  redirect("/Dashboard/Users");
};

export const updateProject = async (formData) => {
  const { id, title, category, img, desc } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const updateFields = { title, category, img, desc };
    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);
    await Project.findByIdAndUpdate(id, updateFields);

    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/Projects");
  redirect("/Dashboard/Projects");
};


export const updateBlogger = async (formData) => {
  const { id, title, category, img, imgDetalis, desc, bloggerContent, visits } = formData;

  try {
    await connectToDb();

    const updateFields = {
      title,
      category,
      img,
      imgDetalis,
      desc,
      bloggerContent,
      visits // Include visits in the updateFields
    };

    // Remove empty fields from updateFields
    Object.keys(updateFields).forEach((key) => 
      (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
    );

    await Blogger.findByIdAndUpdate(id, updateFields, { new: true });

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.log("Update failed:", error);
    throw new Error("Failed to update motion");
  }
  revalidatePath("/Dashboard/Motion");
  redirect("/Dashboard/Motion");
};

export const updateSlide = async (formData) => {
  const { id, title } = Object.fromEntries(formData);
  const img = formData.get('img'); // الحصول على قيمة الصورة من formData
  const imgMobile = formData.get('imgMobile');

  try {
    await connectToDb();
    const updateFields = { title, img , imgMobile};
    Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);
    await Slide.findByIdAndUpdate(id, updateFields);

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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
    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

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

    // Trigger the Vercel deploy hook
    await triggerDeploy();

  } catch (error) {
    console.log("update failed", error);
  }

  revalidatePath("/Dashboard/OurCustomers");
  redirect("/Dashboard/OurCustomers");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // منع إعادة التوجيه التلقائي
    });

    if (result?.error) {
      return "خطأ في اسم المستخدم أو كلمة المرور";
    }

    // إذا نجح تسجيل الدخول، قم بإعادة التوجيه يدويًا
    if (result?.ok) {
      revalidatePath("/Dashboard");
      redirect("/Dashboard");
    }
  } catch (err) {
    return "حدث خطأ أثناء تسجيل الدخول";
  }
  revalidatePath("/Dashboard");
  redirect("/Dashboard");
};

  // VERCEL TRIGGER DEPLOY
const triggerDeploy = async () => {
  try {
    const response = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Deployment triggered successfully!');
    } else {
      console.error('Failed to trigger deployment');
    }
  } catch (error) {
    console.error('Error triggering deployment', error);
  }
};
// "use cleint"
import mongoose from "mongoose";
import {
  Audios,
  Blogger,
  Coustome,
  LatestProjects,
  Motion,
  Project,
  Reviews,
  Service,
  Slide,
  User,
  WeeklyVisit,
} from "./models";
import { connectToDb } from "./utils";

// FETCH


export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await User.find({
      username: { $regex: regex },
    }).countDocuments();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.error("falid to fetch user", error);
    // return { count: 0, users: [] };
  }
};

export const fetchUsersPage = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const users = await User.find({ username: { $regex: regex } })
    return  users ;
  } catch (error) {
    console.error("falid to fetch user", error);
    // return { count: 0, users: [] };
  }
};
export const fetchProjects = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Project.find({
      title: { $regex: regex },
    }).countDocuments();
    const project = await Project.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, project };
  } catch (error) {
    console.error("falid to fetch project", error);
    // return { count: 0, users: [] };
  }
};

export const fetchProjectsPage = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const project = await Project.find({ title: { $regex: regex } })

    return  project ;
  } catch (error) {
    console.error("falid to fetch project", error);
    // return { count: 0, users: [] };
  }
};

export const fetchBloggers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Blogger.find({
      title: { $regex: regex },
    }).countDocuments();
    const blogger = await Blogger.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, blogger };
  } catch (error) {
    console.error("falid to fetch blogger", error);
    // return { count: 0, users: [] };
  }
};

export const fetchBloggersPage = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const blogger = await Blogger.find({ title: { $regex: regex } });

    return blogger ;
  } catch (error) {
    console.error("falid to fetch blogger", error);
    // return { count: 0, users: [] };
  }
};


export async function fetchMostVisitedBlogs(limit = 2) {
  try {
    const mostVisitedBlogs = await Blogger.find().sort({ visits: -1 }).limit(limit); // ترتيب المدونات بناءً على عدد الزيارات بترتيب تنازلي
    // console.log(mostVisitedBlogs)
    return mostVisitedBlogs;
  } catch (error) {
    console.error("Failed to fetch most visited blogs:", error);
    return [];
  }
}

export const fetchSlides = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Slide.find({
      title: { $regex: regex },
    }).countDocuments();
    const slide = await Slide.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, slide };
  } catch (error) {
    console.error("falid to fetch slide", error);
    // return { count: 0, users: [] };
  }
};
export const fetchSlidesSec = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const slide = await Slide.find({ title: { $regex: regex } })

    return slide ;
  } catch (error) {
    console.error("falid to fetch slide", error);
    // return { count: 0, users: [] };
  }
};

export const fetchLatestProjects= async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 4;

  try {
    await connectToDb();
    const count = await LatestProjects.find({
      title: { $regex: regex },
    }).countDocuments();
    const latestProjects = await LatestProjects.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, latestProjects };
    // console.log("latest projects" , latestProjects);
  } catch (error) {
    console.error("Failed to fetch latest projects", error);
    return [];
  }
}
export const fetchLatestProjectsSec= async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();
    const latestProjects = await LatestProjects.find({
      title: { $regex: regex },
    });
    return latestProjects;
  } catch (error) {
    console.error("Failed to fetch latest projects", error);
    return [];
  }
}
export const fetchReviwes = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Reviews.find({
      username: { $regex: regex },
    }).countDocuments();
    const reviews = await Reviews.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, reviews };
  } catch (error) {
    console.error("falid to fetch reviews", error);
    // return { count: 0, users: [] };
  }
};

export const fetchReviwesSec = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();
    const review = await Reviews.find({ username: { $regex: regex } });


    return review;
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    // return { count: 0, users: [] };
  }
};

export const fetchAudios = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const counts = await Audios.find({
      title: { $regex: regex },
    }).countDocuments();
    const audios = await Audios.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    
    // console.log("Fetched audios:", { counts, audios }); // تحقق من جلب البيانات
    
    return { counts, audios };
  } catch (error) {
    console.error("Failed to fetch audios", error);
    return { count: 0, audios: [] };
  }
};

export const fetchAudiosPage = async (q, page) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDb();

    const audios = await Audios.find({ title: { $regex: regex } })

    
    // console.log("Fetched audios:", { counts, audios }); // تحقق من جلب البيانات
    
    return  audios ;
  } catch (error) {
    console.error("Failed to fetch audios", error);
    return { count: 0, audios: [] };
  }
};


export const fetchMotions = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Motion.find({
      title: { $regex: regex },
    }).countDocuments();
    const motions = await Motion.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, motions };
  } catch (error) {
    console.error("falid to fetch motions", error);
    return { count: 0, motions: [] };  }
};

export const fetchMotionsPage = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const motions = await Motion.find({ title: { $regex: regex } })

    return  motions ;
  } catch (error) {
    console.error("falid to fetch motions", error);
    // return { count: 0, users: [] };
  }
};

export const fetchServices = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Service.find({
      category: { $regex: regex },
    }).countDocuments();
    const services = await Service.find({ category: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, services };
  } catch (error) {
    console.error("falid to fetch service", error);
    // return { count: 0, users: [] };
  }
};

export const fetchServicesSec = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();
    const services = await Service.find({ category: { $regex: regex } })
    return services ;
  } catch (error) {
    console.error("falid to fetch service", error);
    // return { count: 0, users: [] };
  }
};

export const fetchCustomes = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 4;
  try {
    await connectToDb();
    const count = await Coustome.find({
      title: { $regex: regex },
    }).countDocuments();
    const coustomes = await Coustome.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, coustomes };
  } catch (error) {
    console.error("falid to fetch coustome", error);
    // return { count: 0, users: [] };
  }
};

export const fetchCustomesSec = async (q, page) => {
  const regex = new RegExp(q, "i");

  try {
    await connectToDb();

    const coustomes = await Coustome.find({ title: { $regex: regex } })
    return coustomes ;
  } catch (error) {
    console.error("falid to fetch coustome", error);
    // return { count: 0, users: [] };
  }
};

export const fetchWeeklyVisit = async () => {
  try {
    await connectToDb();

    const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
    const currentYear = currentDate.getFullYear();

    console.log('Current Week:', currentWeek);
    console.log('Current Year:', currentYear);

    const weeklyVisit = await WeeklyVisit.find({ 
      week: currentWeek, 
      year: currentYear 
    }).sort({ day: 1 });

    console.log('Fetched data:', weeklyVisit);
    console.log('Fetched data type:', typeof weeklyVisit);
    console.log('Is weeklyVisit an array?', Array.isArray(weeklyVisit));

    weeklyVisit.forEach((visit, index) => {
      console.log(`Visit ${index} type:`, typeof visit);
      console.log(`Visit ${index} keys:`, Object.keys(visit));
      console.log(`Visit ${index} day:`, visit.day);
    });

    const formattedData = [
      { name: 'Sun', visit: 0 },
      { name: 'Mon', visit: 0 },
      { name: 'Tue', visit: 0 },
      { name: 'Wed', visit: 0 },
      { name: 'Thu', visit: 0 },
      { name: 'Fri', visit: 0 },
      { name: 'Sat', visit: 0 },
    ];

    const dayMap = {
      'Sun': 'Sun', 'Mon': 'Mon', 'Tue': 'Tue', 'Wed': 'Wed',
      'Thu': 'Thu', 'Fri': 'Fri', 'Sat': 'Sat'
    };

    weeklyVisit.forEach(visit => {
      console.log("Processing visit:", visit);
      const day = visit.day || (visit.toObject && visit.toObject().day);
      console.log("Original day:", day);
      const mappedDay = dayMap[day] || day;
      console.log("Mapped day:", mappedDay);
      const index = formattedData.findIndex(item => item.name === mappedDay);
      console.log("Found index:", index);
      if (index !== -1) {
        formattedData[index].visit = visit.visit || (visit.toObject && visit.toObject().visit) || 0;
        console.log(`Updated formattedData[${index}]:`, formattedData[index]);
      } else {
        console.log(`Day not found in formattedData: ${mappedDay}`);
      }
    });

    console.log('Final formatted data:', formattedData);
    const nonZeroVisits = formattedData.filter(item => item.visit > 0);
    console.log('Non-zero visits:', nonZeroVisits);

    if (nonZeroVisits.length === 0) {
      console.log('Warning: No non-zero visits found. This might indicate a problem with data processing.');
    }

    return formattedData;
  } catch (error) {
    console.error("Failed to fetch weekly visits", error);
    throw error;
  }
};




// دالة مساعدة للحصول على رقم الأسبوع
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}





// SINGLE PAGE FETCH

export const fetchUser = async (id) => {
  try {
    await connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("فشل في جلب المستخدم", error);
  }
};

export const fetchProject = async (id) => {
  try {
    await connectToDb();
    const project = Project.findById(id);
    return project;
  } catch (error) {
    console.error("falid to fetch project", error);
    // return { count: 0, users: [] };
  }
};

export const fetchProjectByTitle = async (title)=>{
  try {
    await connectToDb();
    const project = await Project.findOne({ title: { $regex: new RegExp(title, 'i') } }); 
    return project;
  } catch (error) {
    console.error("Failed to fetch Project by title:", error);
    
  }
}

export const fetchBlogger = async (id) => {
  try {
    await connectToDb();
    const blogger = await Blogger.findById(id); // استخدم await للحصول على النتيجة
    return blogger;
  } catch (error) {
    console.error("Failed to fetch blogger", error);
    return null; // أو قم بإرجاع قيمة مناسبة تشير إلى فشل الاستعلام
  }
};

export const fetchBloggerByTitle = async (title)=>{
  try {
    await connectToDb();
    const blogger = await Blogger.findOne({ title: { $regex: new RegExp(title, 'i') } }); 
    return blogger;
  } catch (error) {
    console.error("Failed to fetch blogger by title:", error);
    
  }
}
export const fetchBloggersByCategory = async (category, limit = 4) => {
  try {
    await connectToDb();
    const bloggers = await Blogger.find({ category }).limit(limit);
    return bloggers;
  } catch (error) {
    console.error("Failed to fetch bloggers by category", error);
    return [];
  }
};

export const fetchMotion = async (id) => {
  try {
    await connectToDb(); // الاتصال بقاعدة البيانات
    const motion = await Motion.findById(id); // البحث عن الحركة بالمعرف الممرر
    return motion; // إرجاع الحركة الموجودة
  } catch (error) {
    console.error("Error fetching motion by id:", error);
    throw new Error("Failed to fetch motion");
    
  }
};

export const fetchMotionByTitle = async (title)=>{
  try {
    await connectToDb();
    const motion = await Motion.findOne({ title: { $regex: new RegExp(title, 'i') } }); 
    return motion;
  } catch (error) {
    console.error("Failed to fetch Motion by title:", error);
    
  }
}



export const fetchLatestProject = async (id) => {
  try {
    await connectToDb();
    const latestProject = LatestProjects.findById(id);
    return latestProject;
  } catch (error) {
    console.error("falid to fetch latestProject", error);
    // return { count: 0, users: [] };
  }
};

export const fetchSlide = async (id) => {
  try {
    await connectToDb();
    const slide = await Slide.findById(id);
    return slide;
  } catch (error) {
    console.error("error in fetch slide", error);
  }
};

export const fetchReviwe = async (id) => {
  try {
    await connectToDb();
    const review = await Reviews.findById(id);
    return review;
  } catch (error) {
    console.error("error in fetch review", error);
  }
};

export const fetchAudio = async (id) => {
  try {
    await connectToDb();
    const audio = await Audios.findById(id);
    return audio;
  } catch (error) {
    console.error("error in fetch audio", error);
  }
};

export const fetchService = async (id) => {
  try {
    await connectToDb();
    const service = await Service.findById(id);
    return service;
  } catch (error) {
    console.error("error in fetch service", error);
  }
};

export const fetchCoustome = async (id) => {
  try {
    await connectToDb();
    const coustome = await Coustome.findById(id);
    return coustome;
  } catch (error) {
    console.error("error in fetch coustome", error);
  }
};




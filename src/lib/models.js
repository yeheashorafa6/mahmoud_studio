import mongoose from "mongoose";
import { category } from "../../data";

// تعريف الـ Schemas
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentSectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['title', 'text'], // Adjust based on your requirements
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const bloggerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    img: {
      type: String,
    },
    imgDetalis: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  sections: [ContentSectionSchema], // Array of embedded documents

    
  },
  {
    timestamps: true,
  }
);

const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LatestProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReviwesSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    job: {
      type: String,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AudiosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    audio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const motionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  media: {
    type: [mediaSchema],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
}, {
  timestamps: true,
});

function arrayLimit(val) {
  return val.length <= 10;
}

const ServiceSchema = new mongoose.Schema({
  category:{
    type: String,
  },
  desc:{
    type: String,
  },
  img :{
    type: String,
  }
},
{
  timestamps: true,
})

const CoustomeSchema = new mongoose.Schema({
  title:{
    type: String,
  },
  link:{
    type: String,
  },
  img :{
    type: String,
  }
},
{
  timestamps: true,
})




export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export const Blogger =
  mongoose.models.Blogger || mongoose.model("Blogger", bloggerSchema);

export const Slide =
  mongoose.models.Slide || mongoose.model("Slide", slideSchema);

export const LatestProjects =
  mongoose.models.LatestProjects ||
  mongoose.model("LatestProjects", LatestProjectSchema);

export const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", ReviwesSchema);

export const Audios =
  mongoose.models.Audios || mongoose.model("Audios", AudiosSchema);

export const Motion =
  mongoose.models.Motion || mongoose.model("Motion", motionSchema);

  export const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

  export const Coustome =
  mongoose.models.Coustome || mongoose.model("Coustome", CoustomeSchema);
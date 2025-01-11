import { model, Schema } from "mongoose";
import { Post } from "src/types/post/post";

const postSchema = new Schema<Post>({
  clientId: {
    type: Schema.Types.ObjectId,
    required:[true, 'A Post must have a clientId.'],
    ref: 'Clients',
  },
  title: {
    type: String,
    required:[true, 'A Post must have a title.'],
  },
  location: {
    type: String,
    required:[true, 'A Post must have a location.'],
  },
  description: {
    type: String,
    required:[true, 'A Post must have a description.'],
},
  duration: {
    type: String,
    required: [true, 'A Post must have a duration.'],
  },
  budget: {
    type: Number,
    required: [true, 'A Post must have a budget.'],
  },
  attachment: {
    type: String,
    default: '',
  },
  
},{
    timestamps: true,
    collection: 'Posts',
});

const Post = model('Posts', postSchema);

export default Post;

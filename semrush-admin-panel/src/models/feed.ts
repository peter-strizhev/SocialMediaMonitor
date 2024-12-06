import { Schema, model, models, Document, Model } from 'mongoose';

interface FeedDocument extends Document {
  platform: string;
  content: string;
  timestamp: Date;
  hashtags: string[];
}

const FeedSchema = new Schema<FeedDocument>({
  platform: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  hashtags: { type: [String] },
});

const Feed: Model<FeedDocument> = models.Feed || model<FeedDocument>('Feed', FeedSchema);

export default Feed;

import { Document, Schema, model } from 'mongoose';

interface Bot extends Document {
  name: string;
  refresh_token?: string;
}


const BotSchema = new Schema<Bot>({
  name: {
    type: String,
    unique: true
  },
  refresh_token: {
    type: String,
    required: true
  }
},
{
  versionKey: false
});



const botModel = model<Bot>('bot', BotSchema);


export { botModel };

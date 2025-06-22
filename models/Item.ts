import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description?: string;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: String,
});

export default models.Item || model<IItem>('Item', ItemSchema);

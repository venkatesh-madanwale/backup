import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true, unique: true })
  emailid: string;

  @Prop({ type: Array, default: [] })
  transactions: any[];
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
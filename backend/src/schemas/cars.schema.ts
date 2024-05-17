import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarsDocument = HydratedDocument<Cars>;

@Schema()
export class Cars {
    @Prop()
    name: string;
}

export const CarsSchema = SchemaFactory.createForClass(Cars);
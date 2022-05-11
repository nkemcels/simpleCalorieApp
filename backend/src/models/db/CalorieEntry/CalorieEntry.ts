import mongoose, { Types, Schema } from "mongoose";

export interface CalorieEntryAttr {
    name: string;
    entryType: "breakfast" | "lunch" | "dinner" | "snack" | "exercise";
    calories: number;
}

export interface CalorieEntryDoc extends CalorieEntryAttr, mongoose.Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

interface CalorieEntryModel extends mongoose.Model<CalorieEntryDoc> {
    build(attr: CalorieEntryAttr): CalorieEntryDoc;
}

const CalorieEntrySchema = new Schema<CalorieEntryDoc, CalorieEntryModel>(
    {
        name: String,
        entryType: String,
        calories: Number,
    },
    { timestamps: true, versionKey: false }
);

const CalorieEntry = mongoose.model<CalorieEntryDoc, CalorieEntryModel>("CalorieEntry", CalorieEntrySchema);

CalorieEntry.build = (attr: CalorieEntryAttr): CalorieEntryDoc => {
    return new CalorieEntry(attr);
};

export { CalorieEntry };

import moment from "moment";
import { Types } from "mongoose";
import { BadRequestError } from "../../errorTypes/BadRequestError";
import { CalorieEntry, CalorieEntryAttr } from "../../models/db/CalorieEntry/CalorieEntry";

export class CalorieEntryManager {
    async addNewEntry(data: CalorieEntryAttr) {
        const entry = CalorieEntry.build(data);
        await entry.save();
        return entry;
    }

    async updateEntry(entryId: Types.ObjectId, data: Partial<CalorieEntryAttr>) {
        const entry = await CalorieEntry.findOneAndUpdate({ _id: entryId }, data, { new: true });
        if (!entry) throw new BadRequestError("Calorie Entry not found");
        return entry;
    }

    async getEntriesByDate(dateInput: Date) {
        const startDate = moment(dateInput).utc().startOf("day").toDate();
        const endDate = moment(dateInput).utc().endOf("day").toDate();

        return this.getEntriesByDateRange(startDate, endDate);
    }

    async getEntriesByDateRange(startDate: Date, endDate: Date) {
        return CalorieEntry.find({ createdAt: { $gte: startDate, $lte: endDate } });
    }

    async deleteEntry(entryId: Types.ObjectId) {
        const entry = await CalorieEntry.findOneAndDelete({ _id: entryId });
        if (!entry) throw new BadRequestError("Calorie Entry not found");
    }
}

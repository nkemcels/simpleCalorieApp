import moment from "moment";
import { Types } from "mongoose";
import { BadRequestError } from "../../errorTypes/BadRequestError";
import { CalorieEntry, CalorieEntryAttr } from "../../models/db/CalorieEntry/CalorieEntry";
import { UserDoc } from "../../models/db/User/User";
import { UserManager } from "../user/manager";

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
        return CalorieEntry.find({ createdAt: { $gte: startDate, $lte: endDate } }).sort("-createdAt");
    }

    async deleteEntry(entryId: Types.ObjectId) {
        const entry = await CalorieEntry.findOneAndDelete({ _id: entryId });
        if (!entry) throw new BadRequestError("Calorie Entry not found");
    }

    private calculateFemaleUserBmr(user: UserDoc) {
        const age = moment().diff(user.dateOfBirth, "years");
        return 447.593 + 9.247 * user.weight + 3.098 * user.height - 4.33 * age;
    }

    private calculateMaleUserBmr(user: UserDoc) {
        const age = moment().diff(user.dateOfBirth, "years");
        return 88.362 + 13.397 * user.weight + 4.799 * user.height - 5.677 * age;
    }

    async getCalorieStats(userId: Types.ObjectId, dateInput: Date) {
        const user = await new UserManager().getCompleteUser(userId);
        const bmr = user.gender === "male" ? this.calculateMaleUserBmr(user) : this.calculateFemaleUserBmr(user);

        const entries = await this.getEntriesByDate(dateInput);
        const totalCalories = bmr + entries.reduce((t, r) => t + (r.calories > 0 ? r.calories : 0), 0);

        const minsSince12AM = moment().diff(moment().startOf("day"), "minutes");

        const burntBMRCalories = (minsSince12AM * bmr) / (24 * 60);
        const burntTotalCalories = burntBMRCalories + entries.reduce((t, r) => t - (r.calories < 0 ? r.calories : 0), 0);

        return {
            totalCalories,
            caloriesLeft: totalCalories - burntTotalCalories,
            bmr,
            burntCalories: burntTotalCalories,
            burntBMR: burntBMRCalories,
        };
    }
}

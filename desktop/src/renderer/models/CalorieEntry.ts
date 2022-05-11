export interface ICalorieEntry {
    _id: string;
    name: string;
    entryType: "breakfast" | "lunch" | "dinner" | "snack" | "exercise";
    calories: number;
    createdAt: string; // ISO Date string;
    updatedAt: string; // ISO Date string;
}

export interface ICalorieStats {
    totalCalories: number;
    caloriesLeft: number;
    bmr: number;
    burntCalories: number;
    burntBMR: number;
}

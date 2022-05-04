declare namespace TaskItemScssNamespace {
    export interface ITaskItemScss {
        Assigned: string;
        Completed: string;
        ContentContainer: string;
        DataContainer: string;
        DateContainer: string;
        ItemIconContainer: string;
        OwnerName: string;
        TaskName: string;
        Unassigned: string;
    }
}

declare const TaskItemScssModule: TaskItemScssNamespace.ITaskItemScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: TaskItemScssNamespace.ITaskItemScss;
};

export = TaskItemScssModule;

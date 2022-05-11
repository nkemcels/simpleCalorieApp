import React from "react";
import DataTable from "../../../components/Table/DataTable/DataTable";
import useCurrentDateCalorieEntries from "../../../hooks/useCurrentDateCalorieEntries";

const CalorieTable = () => {
    const data = useCurrentDateCalorieEntries();
    console.log("DATA ", data);
    return (
        <DataTable
            dataSource={data}
            getColumns={() => [
                { title: "Info", dataIndex: "name" },
                { title: "Type", dataIndex: "entryType" },
                { title: "Calories (kCal)", dataIndex: "calories" },
            ]}
            filterPredicate={() => true}
        />
    );
};

export default CalorieTable;

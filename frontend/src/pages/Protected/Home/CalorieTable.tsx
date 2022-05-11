import React from "react";
import DataTable from "../../../components/Table/DataTable/DataTable";

const CalorieTable = () => {
    return <DataTable getColumns={() => [{ title: "Info" }]} filterPredicate={() => true} />;
};

export default CalorieTable;

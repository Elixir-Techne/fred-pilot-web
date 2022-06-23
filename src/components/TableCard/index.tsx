import { Card, Typography } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";

const TableCard = ({ title, columns, data }: { title: any; columns: any; data: any }) => {
  return (
    <Card>
      <Typography variant="h5">{title}</Typography>
      <DataTable columns={columns} data={data} />
    </Card>
  );
};

export default TableCard;

import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline, EditSquare } from "@mui/icons-material";
import { useState, lazy, Suspense } from "react";
import Warning from "./Warning";
import Alert from "./Alert";

const DataTable = ({ columns, rows, title, onEdit, onDelete, loading }) => {
  const FormComponent = lazy(() =>
    import(`../forms/${title.split("").slice(0, -1).join("")}Form`)
  );

  const EditFormComponent = lazy(() =>
    import(`../forms/Edit${title.split("").slice(0, -1).join("")}Form`)
  );

  const [isWarning, setIsWarning] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columnsWithActions = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" p="10px" gap={1}>
          <EditSquare
            onClick={() => {
              setSelectedRow(params.row);
              setIsEdit(true);
            }}
            sx={{ color: "#277f1fff", cursor: "pointer" }}
          />

          <DeleteOutline
            onClick={() => {
              setIsWarning(true);
              setSelectedRow(params.row);
            }}
            sx={{ color: "error.main", cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box p={2} flex="1" ml="100px" height="100vh">
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setIsAddNew(true);
          }}
        >
          Add New
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <DataGrid
          rows={Array.isArray(rows) ? rows : []}
          columns={columnsWithActions}
          getRowId={(row) => row.id || row._id}
          pageSize={15}
          rowsPerPageOptions={[5, 10, 15]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      )}

      {isWarning && (
        <Warning
          message="Are you sure you want to delete this user?"
          smallMessage="This action cannot be undone."
          buttonName="Delete"
          setIsWarning={setIsWarning}
          onDelete={onDelete}
          id={selectedRow?._id}
        />
      )}

      {isAddNew && (
        <Suspense>
          <Alert setIsOpen={setIsAddNew} isOpen={isAddNew}>
            <FormComponent setIsOpen={setIsAddNew} onSubmit={onEdit} />
          </Alert>
        </Suspense>
      )}

      {isEdit && (
        <Suspense>
          <Alert setIsOpen={setIsEdit} isOpen={isEdit}>
            <EditFormComponent
              initialValues={selectedRow}
              setIsEdit={setIsEdit}
              onSubmit={onEdit}
            />
          </Alert>
        </Suspense>
      )}
    </Box>
  );
};

export default DataTable;

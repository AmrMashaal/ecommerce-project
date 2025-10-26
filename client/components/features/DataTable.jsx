import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline, EditSquare } from "@mui/icons-material";
import { useState } from "react";
import Warning from "./Warning";
import Alert from "./Alert";
import SignupForm from "../forms/SignupForm";
import EditUserForm from "../forms/EditUserForm";
import ProductForm from "../forms/ProductForm";

const DataTable = ({ columns, rows, title, onEdit, onDelete, loading }) => {
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

      {isAddNew && title === "Users" ? (
        <Alert isOpen={isAddNew} setIsOpen={setIsAddNew}>
          <SignupForm isFromAdmin={true} />
        </Alert>
      ) : isAddNew && title === "Products" ? (
        <Alert isOpen={isAddNew} setIsOpen={setIsAddNew}>
          <ProductForm />
        </Alert>
      ) : null}

      {isEdit && title === "Users" ? (
        <Alert isOpen={isEdit} setIsOpen={setIsEdit}>
          <EditUserForm
            initialValues={selectedRow}
            onSubmit={onEdit}
            setIsEdit={setIsEdit}
          />
        </Alert>
      ) : isEdit && title === "Products" ? (
        <Alert isOpen={isEdit} setIsOpen={setIsEdit}>
          <EditProductForm
            initialValues={selectedRow}
            onSubmit={onEdit}
            setIsEdit={setIsEdit}
          />
        </Alert>
      ) : null}
    </Box>
  );
};

export default DataTable;

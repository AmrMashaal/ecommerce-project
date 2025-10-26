import { Box } from "@mui/material";
import AdminNavbar from "../components/layout/AdminNavbar";
import DataTable from "../components/features/DataTable";
import { useEffect, useState } from "react";
import api from "../api";

const AdminUsers = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "_id", headerName: "_ID", width: 70 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "governorate", headerName: "Governorate", width: 70 },
    { field: "city", headerName: "City", width: 70 },
    { field: "street", headerName: "Street", width: 70 },
    { field: "avatar", headerName: "Avatar", width: 60 },
    { field: "isVerified", headerName: "Is Verified", width: 100 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/v1/users/dashboard-users?limit=15&page=1`
        );

        setRows(
          res.data.users.map((user) => ({
            ...user,
            governorate: user.address.governorate,
            city: user.address.city,
            street: user.address.street,
          }))
        );
      } catch (error) {
        if (import.meta.env.VITE_NODE_ENV === "development") {
          console.error("Failed to fetch users:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/api/v1/users/${id}`);
      if (res.status === 200) setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

  const handleEdit = async (
    row,
    setEditLoading,
    setAlertMessage,
    setIsEdit
  ) => {
    setEditLoading(true);
    try {
      const res = await api.put(`/api/v1/users/update-user/${row._id}`, row);

      if (res.status === 200) {
        setRows(rows.map((r) => (r._id === row._id ? row : r)));
        setIsEdit(false);
      }
    } catch (error) {
      if (import.meta.env.VITE_NODE_ENV === "development") {
        console.error(error);
      }

      if (error.status === 400) {
        setAlertMessage(error.response.data.message);
      }
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <Box>
      <AdminNavbar />

      <DataTable
        title="Users"
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
        loading={loading}
        onEdit={handleEdit}
      />
    </Box>
  );
};

export default AdminUsers;

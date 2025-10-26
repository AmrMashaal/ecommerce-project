import { Box } from "@mui/material";
import AdminNavbar from "../components/layout/AdminNavbar";
import DataTable from "../components/features/DataTable";
import { useEffect, useState } from "react";
import api from "../api";

const AdminProducts = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "_id", headerName: "_ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "brand", headerName: "Brand", width: 100 },
    { field: "discount", headerName: "Discount", width: 70 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "slug", headerName: "Slug", width: 100 },
    { field: "stock", headerName: "Stock", width: 70 },
    { field: "description", headerName: "Description", width: 100 },
    { field: "sold", headerName: "Sold", width: 70 },
    { field: "averageRating", headerName: "Average Rating", width: 70 },
    { field: "isFeatured", headerName: "Is Featured", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "createdAt", headerName: "Created At", width: 180 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/v1/products/dashboard-products?limit=15&page=1`
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
      const res = await api.delete(`/api/v1/products/${id}`);
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
      const res = await api.put(
        `/api/v1/products/update-product/${row._id}`,
        row
      );

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
        title="Products"
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
        loading={loading}
        onEdit={handleEdit}
      />
    </Box>
  );
};

export default AdminProducts;

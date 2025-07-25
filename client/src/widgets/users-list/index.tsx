import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetUsers } from "./getUsers";
import ServerStatus from "@shared/ui/ServerStatus";
import type { User } from "@entities/model/users";
import { useMemo } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from '@mui/material/Box';
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@shared/api/users";
import { queryClient } from "@shared/lib/query";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const { data: usersData, isLoading, error } = useGetUsers();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
  })

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>, id:string) => {
    event.stopPropagation();
    deleteMutation.mutate(id)
  };

  const users: User[] = useMemo(() => {
    return Array.isArray(usersData)
      ? usersData
      : Object.values(usersData || {});
  }, [usersData]);

  if (isLoading) return <ServerStatus>Loading...</ServerStatus>;
  if (error) return <ServerStatus>Error: {error.message}</ServerStatus>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ Width: 1070 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Имя</TableCell>
            <TableCell align="right">Фамилия</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.surName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button variant="contained" size="small" color="primary" onClick={() => navigate(`user/${user.id}`)}>
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button variant="outlined"  onClick={(event) => handleRemove(event, user.id!)} size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

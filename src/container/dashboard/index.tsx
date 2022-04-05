import {
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import DashboardLayout from "components/layouts/DashboardLayout";
import { useState } from "react";
import { useList as useUsersList } from "services/user";

import styles from "./style.module.css";

const DashboardContainer = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { isFetching, data } = useUsersList({ page });

  return (
    <DashboardLayout>
      <Stack spacing={4}>
        <Typography variant="h5" component="div">
          User List
        </Typography>

        <table className={styles.table}>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
          {isFetching && <CircularProgress />}
          {data?.data?.map((user) => (
            <tr key={`user_${user.id}`}>
              <td>
                <Avatar
                  alt={`${user.first_name} ${user.last_name}`}
                  src={user.avatar}
                />
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </table>
        <Pagination
          count={data?.total_pages}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </DashboardLayout>
  );
};

export default DashboardContainer;

import { useState, useEffect } from "react";
import axios from "axios";
import { urlStore } from "@/store/store";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { toast } from "react-toastify";
import TableUsers from "@/components/UI/Molecules/TableUsers";
import AddUser from "@/components/UI/Molecules/AddUser";
import FilterUser from "@/components/UI/Molecules/FilterUser";

export default function User() {
  const url = urlStore;
  const [npm, setNpm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [studyPrograms, setStudyPrograms] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [selectedProgram]);

  const fetchUsers = async (loadMore = false) => {
    try {
      const currentPage = loadMore ? page + 1 : 1;
      const response = await axios.get(
        `${url}/api/user?page=${currentPage}&limit=20${
          selectedProgram ? `&studyProgram=${selectedProgram}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
          },
        }
      );

      if (response.data.success) {
        setUsers(
          loadMore ? [...users, ...response.data.data] : response.data.data
        );
        setHasMore(response.data.pagination.hasMore);
        setPage(currentPage);
        setStudyPrograms(response.data.studyPrograms);
      } else {
        toast.error(response.data.message);
        setError("Failed to fetch users");
      }
    } catch (err) {
      toast.error("An error occurred while fetching users");
      setError("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchUsers(true);
  };

  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
    setUsers([]); // Clear existing users
    setPage(1); // Reset page
    setHasMore(true); // Reset hasMore
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/user/add`,
        { npm: npm },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setNpm("");
        fetchUsers();
      } else {
        toast.error(response.data.message);
        setError(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const response = await axios.delete(`${url}/api/user/remove/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers();
      } else {
        toast.error(response.data.message);
        setError(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred while removing the user");
      setError("An error occurred while removing the user");
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="container mx-auto px-4 py-12 font-poppins">
          <h1
            className="text-3xl font-bold mb-8 text-center font-jakarta text-primary"
            data-aos="fade-down"
          >
            User Management
          </h1>
          <AddUser handleAddUser={handleAddUser} npm={npm} setNpm={setNpm} />
          <FilterUser
            studyPrograms={studyPrograms}
            selectedProgram={selectedProgram}
            handleProgramChange={handleProgramChange}
          />
          <TableUsers
            data={users}
            handleLoadMore={handleLoadMore}
            loading={loading}
            handleRemoveUser={handleRemoveUser}
            hasMore={hasMore}
          />
        </div>
      </AdminLayout>
    </>
  );
}

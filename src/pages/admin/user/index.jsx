import { useState, useEffect } from "react";
import axios from "axios";
import { urlStore } from "@/store/store";
import AdminLayout from "@/components/Layouts/AdminLayout";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import InputAuth from "@/components/UI/Atoms/Input/InputAuth";

export default function User() {
  const url = urlStore;
  const [npm, setNpm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`,
        },
      });
      if (response.data.success) {
        setUsers(response.data.data);
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
          <div
            className="w-11/12 md:w-5/6 mx-auto pt-10 pb-4"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-bold mb-8 font-jakarta text-primary">
              Tambah User
            </h3>
            <form
              onSubmit={handleAddUser}
              id="addUser"
              name="addUser"
              className="flex gap-4"
            >
              <input
                type="number"
                id="npm"
                name="npm"
                value={npm}
                required
                onChange={(e) => setNpm(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#5046E4] hover:bg-[#453bcf] text-white font-medium rounded-md text-sm text-center"
              >
                Tambah
              </button>
            </form>
          </div>
          <div
            className="flex flex-col w-11/12 md:w-5/6 mx-auto"
            data-aos="fade-up"
          >
            <div className="-m-1.5 overflow-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border border-gray-200 rounded-lg overflow-auto">
                  <table className="min-w-full divide-y divide-neutral-700">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          No.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          NPM
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          Program Studi
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-sm font-medium"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                      {Array.isArray(users) && users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.npm}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {user.studyProgram}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                              {user.role}
                            </td>
                            <td
                              onClick={() => handleRemoveUser(user._id)}
                              className="whitespace-nowrap px-6 py-4 text-sm"
                            >
                              <div className="flex gap-2 items-center cursor-pointer">
                                <FaTrashCan className="text-red-500 hover:text-red-700" />
                                <p className="font-medium ">Hapus</p>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium"
                          >
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

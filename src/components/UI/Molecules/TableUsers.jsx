import { FaTrashCan } from "react-icons/fa6";
import Spinner from "react-spinner-material";

export default function TableUsers({
  data,
  handleLoadMore,
  loading,
  handleRemoveUser,
  hasMore,
}) {
  return (
    <>
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
                      NPM / ID Pemilih
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
                      Prodi / Jabatan
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
                  {Array.isArray(data) && data.length > 0 ? (
                    data.map((user, index) => (
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
                        colSpan="6"
                        className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium"
                      >
                        {loading ? (
                          <div className="flex justify-center">
                            <Spinner
                              visible={true}
                              color="#5046e4"
                              size={100}
                            />
                          </div>
                        ) : (
                          "No users found."
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {hasMore && data.length > 0 && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className="py-2 px-4 bg-[#5046E4] hover:bg-[#453bcf] text-white font-medium rounded-md text-sm"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

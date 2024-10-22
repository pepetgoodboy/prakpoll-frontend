export default function AddUser({ handleAddUser, npm, setNpm }) {
  return (
    <>
      <div className="w-11/12 md:w-5/6 mx-auto pt-10 pb-4" data-aos="fade-up">
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
    </>
  );
}

export default function SelectOptionAuth({ id, name, value, onChange }) {
  return (
    <>
      <select
        id={id}
        name={name}
        className="w-full px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Pilih Prodi
        </option>
        <option value="Akuntansi">Akuntansi</option>
        <option value="Manajemen Informatika">Manajemen Informatika</option>
        <option value="Perpajakan">Perpajakan</option>
        <option value="Manajemen Bisnis Digital">
          Manajemen Bisnis Digital
        </option>
      </select>
    </>
  );
}

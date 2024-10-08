export default function InputAuth({
  type,
  id,
  name,
  value,
  onChange,
  variant,
}) {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className={`${variant} px-4 py-2 border border-gray-200 outline-none rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]`}
      />
    </>
  );
}

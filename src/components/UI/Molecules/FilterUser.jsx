export default function FilterUser({
  studyPrograms,
  selectedProgram,
  handleProgramChange,
}) {
  return (
    <>
      <div className="w-11/12 md:w-5/6 mx-auto mb-4">
        <select
          value={selectedProgram}
          onChange={handleProgramChange}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:border-[#453bcf] focus:ring-1 focus:ring-[#453bcf]"
        >
          <option value="">Semua User</option>
          {studyPrograms.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

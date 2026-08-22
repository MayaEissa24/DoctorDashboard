import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPatients } from "../../api/patient.api";
import PatientRow, { PATIENT_GRID_COLS } from "../../components/doctor/PatientRow";
import { SearchIcon } from "../../components/layout/nav-icons";
import { useDebounce } from "../../hooks/useDebounce";

function DoctorPatients() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [page, setPage] = useState(1);

  const { data, status, error, refetch } = useQuery({
    queryKey: ["doctor-patients", debouncedSearch, page],
    queryFn: async () => {
      const { data: result } = await getPatients({ q: debouncedSearch, page });
      return result;
    },
  });

  const patients = data ?? [];
  const meta = data?.meta ?? null;

  function updateSearch(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function clearSearch() {
    setSearch("");
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <label className="block min-w-[16rem] flex-1">
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-400">Search</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={updateSearch}
              placeholder="Search by name, phone, or email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:bg-slate-800"
            />
          </div>
        </label>

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            Clear
          </button>
        )}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {status === "pending" && (
          <div className="flex h-40 items-center justify-center text-sm text-slate-400">Loading patients...</div>
        )}

        {status === "error" && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            <p>{error?.response?.data?.message || "We couldn't load your patients. Please try again."}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-slate-800 dark:hover:bg-red-950/30"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "success" && patients.length === 0 && (
          <p className="rounded-lg bg-slate-50 px-4 py-8 text-center text-sm text-slate-400 dark:bg-slate-900/50">
            No patients match your search.
          </p>
        )}

        {status === "success" && patients.length > 0 && (
          <div>
            <div className="overflow-x-auto">
              <div className="min-w-[34rem]">
                <div
                  className={`grid ${PATIENT_GRID_COLS} items-center gap-4 border-b border-slate-200 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-slate-700 dark:text-slate-500`}
                >
                  <span aria-hidden="true" />
                  <span>Patient</span>
                  <span>Contact</span>
                  <span className="text-right">Last Visit</span>
                </div>
                {patients.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </div>
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
                <p className="text-xs text-slate-400">
                  Showing {(meta.page - 1) * meta.limit + 1}
                  {"–"}
                  {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} patients
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                    disabled={!meta.hasPrev}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Page {meta.page} of {meta.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!meta.hasNext}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default DoctorPatients;

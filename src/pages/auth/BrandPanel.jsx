import doctorPhoto from "../../assets/doctor-suggesting-hospital-program-patient.jpg";

function BrandPanel() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0f2c66] via-[#1d4ed8] to-[#2563eb] text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-amber-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-black/25 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="px-10 pt-10 lg:px-14 lg:pt-12">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M3 12h18" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">Digital Hub</span>
          </div>

          <div className="mt-10 max-w-md lg:mt-12">
            <h1 className="text-[1.9rem] font-bold leading-[1.2] lg:text-[2.15rem]">
              Seamless healthcare access with smart, modern clinic
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Book appointments, manage your practice, and connect with patients — all from one
              simple, modern platform built for clinics.
            </p>
          </div>
        </div>

        <div className="relative mt-8 flex-1">
          <img
            src={doctorPhoto}
            alt="A doctor reviewing a patient's care plan together"
            className="absolute inset-0 h-full w-full rounded-t-[2.5rem] object-cover object-[center_30%] lg:rounded-t-[3rem]"
          />
          <div className="absolute inset-x-0 top-0 h-20 rounded-t-[2.5rem] bg-gradient-to-b from-[#0f2c66] to-transparent lg:rounded-t-[3rem]" />
          <div className="absolute inset-0 rounded-t-[2.5rem] bg-gradient-to-t from-[#0a1f4d]/70 via-transparent to-transparent lg:rounded-t-[3rem]" />
        </div>
      </div>
    </div>
  );
}

export default BrandPanel;

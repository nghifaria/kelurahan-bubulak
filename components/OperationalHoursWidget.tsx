"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { operationalHours } from "@/lib/data";

function getWibDate(): Date {
  // Return current Date adjusted to Asia/Jakarta (UTC+7)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 7 * 3600000);
}

export function OperationalHoursWidget() {
  const [mounted, setMounted] = useState(false);
  const [wibDate, setWibDate] = useState<Date>(() => getWibDate());

  useEffect(() => {
    setMounted(true);
    setWibDate(getWibDate());

    const interval = setInterval(() => {
      setWibDate(getWibDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = wibDate || getWibDate();

  // Format Time: HH:mm WIB (TANPA DETIK SESUAI ATURAN USER)
  const hoursStr = String(currentDate.getHours()).padStart(2, "0");
  const minutesStr = String(currentDate.getMinutes()).padStart(2, "0");
  const timeFormatted = `${hoursStr}:${minutesStr} WIB`;

  // Format Date & Day in ID
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const currentDay = dayNames[currentDate.getDay()];
  const dateFormatted = `${currentDay}, ${currentDate.getDate()} ${
    monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  // Calculate Open/Closed Status
  const todayHours = operationalHours.find((h) => h.day === currentDay) || null;
  let isOpen = false;

  if (todayHours && todayHours.open && todayHours.close) {
    const currentMinutesCount = currentDate.getHours() * 60 + currentDate.getMinutes();
    const [openH, openM] = todayHours.open.split(":").map(Number);
    const [closeH, closeM] = todayHours.close.split(":").map(Number);
    const openMinutesCount = openH * 60 + openM;
    const closeMinutesCount = closeH * 60 + closeM;

    isOpen = currentMinutesCount >= openMinutesCount && currentMinutesCount < closeMinutesCount;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* STATUS & LIVE CLOCK SIDEBAR */}
      <div
        className={`flex flex-col items-center justify-center gap-3 px-8 py-8 text-center lg:w-80 shrink-0 transition-colors ${
          isOpen
            ? "bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900 text-white"
            : "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white"
        }`}
      >
        {isOpen ? (
          <div className="relative">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 animate-pulse" />
          </div>
        ) : (
          <div className="relative">
            <XCircle className="h-14 w-14 text-amber-400" />
          </div>
        )}

        <div>
          <span
            className={`inline-block rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase mb-1.5 ${
              isOpen
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
            }`}
          >
            {isOpen ? "Pelayanan Buka" : "Kantor Tutup"}
          </span>
          <p className="text-3xl font-extrabold text-white tracking-tight">
            {isOpen ? "BUKA" : "TUTUP"}
          </p>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            {todayHours?.open
              ? `Jam Buka: ${todayHours.open} - ${todayHours.close}`
              : "Hari Ini Libur Pelayanan"}
          </p>
        </div>
      </div>

      {/* SCHEDULE TABLE & LIVE TIME DISPLAY */}
      <div className="flex-1 p-6 lg:p-8 bg-white">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-800 font-bold border border-emerald-200/60">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Jadwal Pelayanan Kantor
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Kelurahan Bubulak, Kecamatan Bogor Barat
              </p>
            </div>
          </div>

          {/* LIVE WIB TIME BADGE (NO SECONDS) */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white border border-slate-800 shadow-xs">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-xs">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <span suppressHydrationWarning>{mounted ? dateFormatted : "Waktu WIB"}</span>
              </div>
              <p suppressHydrationWarning className="text-lg font-extrabold text-white font-mono tracking-wider">
                {mounted ? timeFormatted : "--:-- WIB"}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {operationalHours
            .filter((h) => h.open)
            .map((h) => {
              const isToday = h.day === currentDay;
              return (
                <div
                  key={h.day}
                  className={`flex flex-col justify-between rounded-2xl p-3.5 text-sm transition-all border ${
                    isToday
                      ? "bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-400"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold">{h.day}</span>
                    {isToday && (
                      <span className="text-[10px] uppercase font-extrabold bg-white text-emerald-900 px-1.5 py-0.5 rounded">
                        Hari Ini
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-sm mt-1">
                    {h.open} - {h.close}
                  </span>
                </div>
              );
            })}
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Waktu pelayanan mengacu pada Waktu Indonesia Barat (WIB). Sabtu, Minggu & Hari Libur Nasional kantor tutup.
        </p>
      </div>
    </div>
  );
}

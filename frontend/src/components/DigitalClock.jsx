import { useEffect, useState } from "react";
import { Clock, Globe } from "@phosphor-icons/react";

/**
 * DigitalClock Component
 * Displays current time in multiple time zones with pastel + neon aesthetic
 */

function TimeZoneCard({ timezone, city, offset }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get time in specific timezone
  const getTimeInZone = () => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const tzTime = new Date(utc + 3600000 * offset);
    return tzTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getDateInZone = () => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const tzTime = new Date(utc + 3600000 * offset);
    return tzTime.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const glowColors = [
    "shadow-pink-500/30",
    "shadow-purple-500/30",
    "shadow-cyan-500/30",
    "shadow-blue-500/30",
  ];
  const randomGlow = glowColors[Math.floor(Math.random() * glowColors.length)];

  return (
    <div
      className={`relative rounded-2xl border border-pink-300/30 bg-gradient-to-br from-pink-400/8 via-purple-300/5 to-cyan-400/8 backdrop-blur-md p-6 shadow-lg ${randomGlow} hover:border-pink-300/50 hover:shadow-xl transition-all duration-500 group overflow-hidden`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

      {/* Animated glow dot */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-400/15 blur-2xl group-hover:bg-pink-400/25 transition-all duration-500" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} weight="duotone" className="text-pink-300" />
          <div>
            <h3 className="font-semibold text-white text-lg">{city}</h3>
            <p className="text-xs text-zinc-400 uppercase tracking-wider">
              {timezone}
            </p>
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-gradient-to-r from-black/40 to-black/20 rounded-xl p-4 mb-3 border border-pink-300/20">
          <div className="font-display text-4xl font-light tracking-tight bg-gradient-to-r from-pink-300 to-cyan-300 bg-clip-text text-transparent mb-2">
            {getTimeInZone()}
          </div>
          <div className="text-sm text-zinc-400">{getDateInZone()}</div>
        </div>

        {/* UTC Offset */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500 uppercase tracking-wider">
            UTC {offset > 0 ? "+" : ""}{offset}
          </div>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function DigitalClockWidget() {
  const timeZones = [
    { timezone: "PST", city: "Los Angeles", offset: -8 },
    { timezone: "CST", city: "Chicago", offset: -6 },
    { timezone: "EST", city: "New York", offset: -5 },
    { timezone: "GMT", city: "London", offset: 0 },
    { timezone: "CET", city: "Paris", offset: 1 },
    { timezone: "IST", city: "India", offset: 5.5 },
    { timezone: "JST", city: "Tokyo", offset: 9 },
    { timezone: "AEST", city: "Sydney", offset: 10 },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/10 to-black px-6 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock size={32} weight="duotone" className="text-pink-300" />
            <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight gradient-neon-text">
              Global Time Zone Clock
            </h1>
          </div>
          <p className="text-zinc-300 max-w-2xl mx-auto mt-4 text-lg">
            Track time across the world in real-time with our beautiful, responsive digital clock widget.
          </p>
        </div>

        {/* Your Local Time */}
        <div className="mb-12 flex justify-center">
          <div className="relative rounded-3xl border-2 border-pink-300/40 bg-gradient-to-br from-pink-400/15 via-purple-300/10 to-cyan-400/15 backdrop-blur-xl p-8 shadow-2xl shadow-pink-500/20 max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-cyan-500/10 rounded-3xl pointer-events-none" />
            <div className="relative z-10 text-center">
              <div className="text-sm uppercase tracking-widest text-pink-300 font-semibold mb-3">
                Your Local Time
              </div>
              <div className="font-display text-6xl font-light tracking-tighter bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-3">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </div>
              <div className="text-zinc-300 text-lg font-medium">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Time Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeZones.map((tz) => (
            <TimeZoneCard
              key={tz.timezone}
              timezone={tz.timezone}
              city={tz.city}
              offset={tz.offset}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 rounded-2xl border border-pink-300/30 bg-gradient-to-br from-pink-400/8 to-purple-400/8 backdrop-blur-md p-8 text-center">
          <p className="text-zinc-300 leading-relaxed max-w-3xl mx-auto">
            All times update in real-time. Perfect for scheduling meetings across different time zones. 
            Add or customize time zones as needed for your business or personal use.
          </p>
        </div>
      </div>
    </section>
  );
}

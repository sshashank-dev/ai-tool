import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Telemetry({ isActive }) {
    const [metrics, setMetrics] = useState({ ping: 24, cpu: 12, mem: 44.2, status: 'STABLE', temp: '--' });
    const [logs, setLogs] = useState(["SYSTEM_READY", "ENCRYPT_SSL_ACTIVE", "NEURAL_PATH_OPEN"]);
    const [time, setTime] = useState(new Date());

    // 🕒 IST Clock Logic
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // 🌍 Jaipur Environment Fetch
    useEffect(() => {
        const fetchAtmos = async () => {
            try {
                const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=26.9124&longitude=75.7873&current_weather=true");
                const data = await res.json();
                setMetrics(prev => ({ ...prev, temp: Math.round(data.current_weather.temperature) }));
            } catch (e) {
                setMetrics(prev => ({ ...prev, temp: 30 })); // Fallback
            }
        };
        fetchAtmos();
    }, []);

    // Rapid Metric Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                ping: Math.floor(Math.random() * (32 - 14) + 14),
                cpu: isActive ? Math.floor(Math.random() * (98 - 85) + 85) : Math.floor(Math.random() * (12 - 4) + 4),
                mem: (44 + Math.random()).toFixed(1),
                status: isActive ? 'ANALYZING' : 'STABLE'
            }));
        }, 1500);
        return () => clearInterval(interval);
    }, [isActive]);

    // Active Log Streaming
    useEffect(() => {
        if (isActive) {
            const events = ["VOX_LINK_SYNC", "BIT_STREAM_RX", "ALPHA_VEC_IDENT", "NODE_PULSE_HI", "DATA_PKT_RECV"];
            const logInterval = setInterval(() => {
                setLogs(prev => [events[Math.floor(Math.random() * events.length)], ...prev].slice(0, 5));
            }, 800);
            return () => clearInterval(logInterval);
        }
    }, [isActive]);

    return (
        <aside className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 w-52 h-[80vh] flex-col p-6 rounded-[3.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(168,85,247,0.15)] z-0 overflow-hidden font-mono">

            {/* 🟦 THE BACKGROUND SCAN-LINE GRID */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
            <motion.div
                animate={{ y: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-purple-500/20 blur-sm z-0"
            />

            {/* 🛰️ NEW: GEOLOCATION & TIME SECTOR */}
            <div className="relative z-10 mb-6 pb-4 border-b border-white/5">
                <div className="flex justify-between items-center text-[7px] text-purple-500/50 tracking-[0.3em] uppercase mb-2">
                    <span>Local_Node</span>
                    <span>Jaipur_IN</span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-white tracking-tighter">
                        {time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="text-[10px] text-purple-400 font-bold">{metrics.temp}°C</span>
                </div>
            </div>

            {/* 📟 HEADER: SYSTEM IDENTITY */}
            <div className="relative z-10 flex justify-between items-start mb-6">
                <div className="space-y-1">
                    <div className="text-[7px] font-black tracking-[0.4em] text-purple-500/50 uppercase">Neural_Link</div>
                    <div className="text-[11px] font-bold text-white tracking-tighter italic">ECLIPSE_OS_v4.7</div>
                </div>
            </div>

            {/* 🌀 CENTER: THE CORE ENGINE */}
            <div className="relative flex-1 flex items-center justify-center scale-75">
                {[160, 120, 80].map((size, i) => (
                    <motion.div
                        key={size}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{ repeat: Infinity, duration: isActive ? 3 : 15, ease: "linear" }}
                        style={{ width: size, height: size }}
                        className="absolute rounded-full border border-purple-500/10 border-t-purple-500/40"
                    />
                ))}

                <motion.div
                    animate={{
                        scale: isActive ? [1, 1.3, 1] : 1,
                        boxShadow: isActive ? ["0 0 20px #a855f7", "0 0 50px #a855f7", "0 0 20px #a855f7"] : "0 0 10px #3b0764"
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`w-6 h-6 rounded-full ${isActive ? 'bg-purple-400' : 'bg-purple-900/40'} z-10`}
                />

                <motion.span
                    animate={{ opacity: isActive ? [0.5, 1, 0.5] : 0.2 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-[-20px] text-[8px] font-black tracking-[0.5em] text-purple-300 uppercase"
                >
                    {metrics.status}
                </motion.span>
            </div>

            {/* 📊 DATA SECTOR */}
            <div className="relative z-10 space-y-6 mb-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-white/20 uppercase">Load</span>
                        <span className="text-purple-400 font-bold">{metrics.cpu}%</span>
                    </div>
                    <div className="flex gap-[1.5px] h-2 items-end">
                        {Array.from({ length: 18 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: isActive ? `${Math.random() * 100}%` : `${30 + (i % 3) * 10}%`,
                                    opacity: (metrics.cpu / 100) * 18 > i ? 1 : 0.1
                                }}
                                className="flex-1 bg-purple-500 rounded-t-[1px]"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-[8px] font-mono text-white/20 uppercase">Ping</div>
                    <span className="text-[9px] font-mono text-cyan-400">{metrics.ping}ms</span>
                </div>
            </div>

            {/* ⌨️ TERMINAL OUTPUT */}
            <div className="relative z-10 h-28 border-t border-white/5 pt-4 overflow-hidden">
                <div className="space-y-1.5">
                    <AnimatePresence initial={false}>
                        {logs.map((log, i) => (
                            <motion.div
                                key={log + i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1 - (i * 0.2), x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 font-mono text-[7px]"
                            >
                                <span className="text-purple-600/50 font-bold">»</span>
                                <span className="text-white/40 tracking-tight uppercase">{log}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* 🛡️ FOOTER */}
            <div className="relative z-10 mt-auto flex justify-between items-center opacity-10 text-[5px] tracking-widest uppercase">
                <span>Node: JP_RR_01</span>
                <span>Sharma_V4</span>
            </div>
        </aside>
    );
}
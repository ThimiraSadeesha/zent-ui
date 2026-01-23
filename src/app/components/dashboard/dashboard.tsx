"use client";

import React, { useState } from "react";
import { Cpu, Activity, HardDrive, Layers, Clock } from "lucide-react";
import { ResponsiveContainer, AreaChart, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area } from "recharts";
import {BackgroundBeams} from "../login";

interface DashboardProps {
    title?: string;
}

export const Dashboard = React.memo<React.FC<DashboardProps>>(() => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const systemData = {
        ram: { used_mb: "2231", total_mb: "7491", percent: "29.78" },
        disk: { used: "36G", total: "74G", percent: "48%" },
        cpu: { percent: "1.5" },
        threads: { count: "586" },
        uptime: { uptime: "53 days, 9:50, | Load: 0.01, 0.01, 0.00" },
        os: { name: "Rocky Linux", version: "9.7 (Blue Onyx)" }
    };

    const cpuHistory = [
        { time: '10:00', value: 2.1 },
        { time: '10:15', value: 1.8 },
        { time: '10:30', value: 2.3 },
    ];

    return (
        <div style={{ minHeight: "100vh", padding: "24px", background: "#f0f2f5" }}>
            <h1>System Dashboard - {systemData.os.name}</h1>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            <div>
                <p>CPU Usage: {systemData.cpu.percent}%</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={cpuHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area dataKey="value" stroke="#667eea" fill="#667eea" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

Dashboard.displayName = "Dashboard";

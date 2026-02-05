interface DockerDetailCardProps {
    name: string;
    cpu_percent: string;
    memory_usage: string;
    memory_percent: string;
    network_io: string;
    block_io: string;
    pids: string;
    status: string;
    state: string;
    image: string;
    onStart?: () => void;
    onStop?: () => void;
    onRestart?: () => void;
}

const DockerDetailCard: React.FC<DockerDetailCardProps> = ({
    name,
    cpu_percent,
    memory_usage,
    memory_percent,
    network_io,
    block_io,
    pids,
    status,
    state,
    image,
    onStart,
    onStop,
    onRestart,
}) => {
    // Determine status color and badge
    const getStatusBadge = () => {
        if (state === "running") {
            if (status.includes("unhealthy")) {
                return { color: "bg-orange-500", text: "Unhealthy", textColor: "text-orange-500" };
            }
            if (status.includes("healthy")) {
                return { color: "bg-teal-500", text: "Healthy", textColor: "text-teal-500" };
            }
            return { color: "bg-green-500", text: "Running", textColor: "text-green-500" };
        }
        if (state === "created") {
            return { color: "bg-blue-500", text: "Created", textColor: "text-blue-500" };
        }
        return { color: "bg-red-500", text: "Stopped", textColor: "text-red-500" };
    };

    const badge = getStatusBadge();

    return (
        <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
            {/* Container Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-neutral-200 font-semibold">{name}</h3>
                        <span className={`flex items-center gap-1 text-xs ${badge.textColor}`}>
                            <span className={`w-2 h-2 rounded-full ${badge.color}`}></span>
                            {badge.text}
                        </span>
                    </div>
                    <p className="text-neutral-500 text-xs">{image}</p>
                </div>
            </div>

            {/* Status */}
            <p className="text-neutral-400 text-sm mb-3">{status}</p>

            {/* Metrics Grid */}
            <div className="space-y-3 mb-4">
                {/* CPU and Memory with Progress Bars */}
                <div className="p-3 rounded bg-neutral-800/50">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400">CPU Usage</span>
                        <span className="text-neutral-200 font-medium">{cpu_percent}</span>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2">
                        <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${parseFloat(cpu_percent) || 0}%` }}
                        ></div>
                    </div>
                </div>

                <div className="p-3 rounded bg-neutral-800/50">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-neutral-400">Memory Usage</span>
                        <span className="text-neutral-200 font-medium">{memory_percent}</span>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2 mb-1">
                        <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${parseFloat(memory_percent) || 0}%` }}
                        ></div>
                    </div>
                    <p className="text-neutral-500 text-xs">{memory_usage}</p>
                </div>

                {/* Other Metrics Grid */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-neutral-800/50">
                        <p className="text-neutral-500 text-xs">PIDs</p>
                        <p className="text-neutral-200 text-sm font-medium">{pids}</p>
                    </div>
                    <div className="p-2 rounded bg-neutral-800/50">
                        <p className="text-neutral-500 text-xs">Network I/O</p>
                        <p className="text-neutral-200 text-sm font-medium">{network_io}</p>
                    </div>
                    <div className="p-2 rounded bg-neutral-800/50">
                        <p className="text-neutral-500 text-xs">Block I/O</p>
                        <p className="text-neutral-200 text-sm font-medium">{block_io}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Icon Based */}
            <div className="flex items-center gap-2">
                {/* Start Button */}
                <button
                    onClick={onStart}
                    disabled={state === "running"}
                    className={`p-2 rounded-lg transition flex items-center justify-center ${state === "running"
                            ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                            : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        }`}
                    title="Start Container"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </button>

                {/* Stop Button */}
                <button
                    onClick={onStop}
                    disabled={state !== "running"}
                    className={`p-2 rounded-lg transition flex items-center justify-center ${state !== "running"
                            ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        }`}
                    title="Stop Container"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="6" width="12" height="12" />
                    </svg>
                </button>

                {/* Restart Button */}
                <button
                    onClick={onRestart}
                    disabled={state !== "running"}
                    className={`p-2 rounded-lg transition flex items-center justify-center ${state !== "running"
                            ? "bg-neutral-700 text-neutral-500 cursor-not-allowed"
                            : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        }`}
                    title="Restart Container"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DockerDetailCard;

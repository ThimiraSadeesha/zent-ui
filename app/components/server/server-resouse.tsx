

interface SystemResourceCardProps {
    title: string;
    usage: number;
}

const SystemResourceCard: React.FC<SystemResourceCardProps> = ({ title, usage }) => {
    return (
        <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
            <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-400">{title}</span>
                <span className="text-neutral-200">{usage}%</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${usage}%` }}></div>
            </div>
        </div>
    );
};

export default SystemResourceCard;

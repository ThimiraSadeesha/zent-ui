interface SystemInfoCardProps {
    title: string;
    value: string;
    icon?: string;
}

const SystemInfoCard: React.FC<SystemInfoCardProps> = ({ title, value, icon }) => {
    return (
        <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                {icon && <span className="text-xl">{icon}</span>}
                <p className="text-neutral-400 text-sm">{title}</p>
            </div>
            <p className="text-neutral-200 font-medium">{value}</p>
        </div>
    );
};

export default SystemInfoCard;

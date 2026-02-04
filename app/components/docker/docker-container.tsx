interface DockerContainerCardProps {
    name: string;
    status: "Running" | "Stopped";
}

const DockerContainerCard: React.FC<DockerContainerCardProps> = ({ name, status }) => {
    const color = status === "Running" ? "bg-green-500" : "bg-red-500";
    return (
        <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-800/50">
            <div>
                <p className="text-neutral-200 font-medium">{name}</p>
                <p className="text-neutral-500 text-xs">{status}</p>
            </div>
            <span className={`w-2 h-2 rounded-full ${color}`}></span>
        </div>
    );
};

export default DockerContainerCard;

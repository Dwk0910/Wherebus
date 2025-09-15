import { useParams } from "react-router-dom";

export default function ViewRoutes() {
    const { routeId } = useParams();
    return (
        <div>
            <span>View route: {routeId}</span>
        </div>
    );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KanbanRedirect () {

    const navigate = useNavigate();

    useEffect(() => {(() => {
        {
            navigate('/main');
        }
        })();
      },[])

    return (
        <div>
            Redirect
        </div>
    )
}

export default KanbanRedirect;
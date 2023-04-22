import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KanbanRedirect () {

    const navigate = useNavigate();

    console.log("REDIRECT!!!");

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
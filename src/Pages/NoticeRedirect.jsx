import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoticeRedirect () {

    const navigate = useNavigate();

    console.log("REDIRECT!!!");

    useEffect(() => {(() => {
        {
            navigate('/main/notice');
        }
        })();
      },[])

    return (
        <div>
            Redirect
        </div>
    )
}

export default NoticeRedirect;
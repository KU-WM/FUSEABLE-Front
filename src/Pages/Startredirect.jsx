import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectListState } from "../recoil";


const Startredirect = (() => {
  const [projectList, setProjectList] = useRecoilState(projectListState);

  const navigate = useNavigate();

  const getId = () => {
    let id = projectList.length > 0 ? projectList.length : 0;
    return id;
  }

  useEffect(() => {(async() => {
    try {
      const UserProfile = window.localStorage.getItem("profile");
      const res = await axios
      // .post(
      //   "URL",
      //   UserProfile
      // )
      .get(
        '/dummy/dummyProject.json'
      )
      .then((response) => {
        (response.data).map((data) => {
          setProjectList((oldprojectList) => [
            ...oldprojectList,
            {
              id: data.id,
              title: data.title,
            },
          ])
        })
        navigate('/start');
      })
    }
    catch (e) {
      console.error(e);
    }
    })();
  },[])

  return (
    <>
    </>
  )
})

export default Startredirect;
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Page = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "yasemin.topcuu",
    password: "zKyS3A6G2Q6Vd@",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.userName,
      password: data.password,
    };
    axios.post(`http://localhost/api/login`, userData).then((res) => {
      localStorage.setItem("jwt", res.data.data);
      navigate("/header");
    });
  };
  return (
    <div className="Page-form-container">
      <form className="Page-form">
        <div className="Page-form-content">
          <h3 className="Page-form-title">Login</h3>
          <div className="form-group mt-3">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="username"
              className="form-control mt-1"
              name="username"
              placeholder="Enter username"
              value={data.userName}
              onChange={(e) =>
                setData({
                  ...data,
                  userName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Page;

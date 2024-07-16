import { useCallback, useEffect } from "react";
import { getUserInfo } from "../api/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setUser , ReloadUser } from "../redux/userSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = (props) => {
  const { user, reloadUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = useCallback(async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error(response.message);
        navigate("/login");
      }
      dispatch(ReloadUser(false));
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  }, [navigate, dispatch]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) getData();
    } else navigate("/login");
  }, [navigate, user, getData]);

  useEffect(() => {
    if (reloadUser) getData();
  }, [reloadUser, getData]);

  return (
    user && (
      <div>
        <DefaultLayout>{props.children}</DefaultLayout>
      </div>
    )
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

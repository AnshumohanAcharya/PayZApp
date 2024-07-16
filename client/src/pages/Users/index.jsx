import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers, updateUserVerifiedStatus } from "../../api/users";
import PageTitle from "../../components/PageTitle";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateStatus = async (record, isVerified) => {
    try {
      const response = await updateUserVerifiedStatus({
        selectedUser: record._id,
        isVerified: isVerified,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      render: (text) => {
        return text ? "Yes" : "No";
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isVerified ? (
              <button
                className="border-2 p-3"
                onClick={() => updateStatus(record, false)}
              >
                Suspend
              </button>
            ) : (
              <button
                className="border-2 p-3"
                onClick={() => updateStatus(record, true)}
              >
                Activate
              </button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PageTitle title="Users" />
      <Table dataSource={users} columns={columns} className="mt-2" />
    </div>
  );
};

export default Users;

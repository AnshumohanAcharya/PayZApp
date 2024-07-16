import { message, Table, Tabs } from "antd";
const { TabPane } = Tabs;
import PageTitle from "../../components/PageTitle";
import { useCallback, useEffect, useState } from "react";
import NewRequestModal from "./NewRequestModal";
import { GetAllRequests, UpdateRequestStatus } from "../../api/request";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { ReloadUser } from "../../redux/userSlice";

const Requests = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [data, setData] = useState([]);
  const updateStatus = async (record, status) => {
    try {
      if (status === "Accepted" && record.amount > user.balanceAmount) {
        message.error("Insufficient balance");
        return;
      } else {
        const response = await UpdateRequestStatus({ ...record, status });
        if (response.success) {
          message.success(response.message);
          getData();
          dispatch(ReloadUser(true));
        } else message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      render(sender) {
        return sender.firstName + " " + sender.lastName;
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render(receiver) {
        return receiver.firstName + " " + receiver.lastName;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      render(text, record) {
        return moment(record.createdAt).format("YYYY-MM-DD HH:mm:ss A");
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "Pending" && record.receiver._id === user._id) {
          return (
            <div className="flex gap-1">
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "Rejected")}
              >
                Reject
              </h1>
              <h1
                className="text-sm underline"
                onClick={() => updateStatus(record, "Accepted")}
              >
                Accept
              </h1>
            </div>
          );
        }
      },
    },
  ];

  const getData = useCallback(async () => {
    try {
      const response = await GetAllRequests();
      if (response.success) {
        const sentData = response.data.filter(
          (item) => item.sender._id === user._id
        );
        const receivedData = response.data.filter(
          (item) => item.receiver._id === user._id
        );
        setData({
          sent: sentData,
          received: receivedData,
        });
      }
    } catch (error) {
      message.error(error.message);
    }
  }, [user._id]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Requests" />
        <button
          className="outline px-2 text-primary w-fit text-lg mt-1.5"
          onClick={() => setShowRequestModal(true)}
        >
          Request Funds
        </button>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key={1}>
          <Table columns={columns} dataSource={data.sent} />
        </TabPane>
        <TabPane tab="Received" key={2}>
          <Table columns={columns} dataSource={data.received} />
        </TabPane>
      </Tabs>

      {showRequestModal && (
        <NewRequestModal
          showRequestModal={showRequestModal}
          setShowRequestModal={setShowRequestModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Requests;

import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { message, Table } from "antd";
import TransferFundsModal from "./TransferFundsModal";
import { GetAllTransactions } from "../../api/transaction";
import moment from "moment";
import { useSelector } from "react-redux";
import DepositModal from "./DepositModal";

const Transactions = () => {
  const [showTransferFundsModal, setShowTransferFundsModal] = useState(false);
  const [data = [], setData] = useState([]);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if (record.sender._id === record.receiver._id) return "Deposit";
        else if (record.sender._id === user._id) return "Debit";
        else return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const getData = async () => {
    try {
      const response = await GetAllTransactions();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      return;
    }, 5000);
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-1 items-center">
          <button
            className="outline text-primary p-1.5 px-4 text-white w-full text-xl"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="bg-primary px-4 py-2 text-white w-full text-xl"
            onClick={() => setShowTransferFundsModal(true)}
          >
            Transfer
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-2 border-1 border-solid border-[#cdcdcd]"
      />

      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />
      )}

      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
};

export default Transactions;

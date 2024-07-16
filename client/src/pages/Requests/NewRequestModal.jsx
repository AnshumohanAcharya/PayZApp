import { Form, message, Modal } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { VerifyAccount } from "../../api/transaction";
import { useSelector } from "react-redux";
import { SendRequest } from "../../api/request";

const NewRequestModal = ({
  showRequestModal,
  setShowRequestModal,
  reloadData,
}) => {
  const { user } = useSelector((state) => state.user);
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState("");
  const verifyAccount = async () => {
    try {
      const response = await VerifyAccount({
        receiver: accountNumber,
      });
      if (response.success) setVerified("true");
      else setVerified("false");
    } catch (error) {
      setVerified("false");
    }
  };

  const onFinish = async (values) => {
    try {
      values.amount = parseInt(values.amount);
      if (values.amount > user.balanceAmount) {
        message.error("Insufficient balance");
        return;
      }
      const payload = {
        ...values,
        sender: user._id,
        status: "succcess",
      };
      const response = await SendRequest(payload);
      if (response.success) {
        reloadData();
        message.success(response.message);
        setShowRequestModal(false);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <Modal
        title="Request Funds"
        open={showRequestModal}
        onCancel={() => setShowRequestModal(false)}
        footer={null}
      >
        <Form action="" layout="vertical" onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item
              label="Account Number"
              name="receiver"
              className="w-full"
            >
              <input
                type="text"
                className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-full py-[8px] px-[10px] outline-none"
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
              />
            </Form.Item>
            <button
              className="bg-primary p-1 text-white w-fit text-lg mt-1.5"
              type="button"
              onClick={verifyAccount}
            >
              VERIFY
            </button>
          </div>
          {verified === "true" && (
            <div className="bg-[#107010] text-white p-[10px] rounded-[3px]">
              Account Verified Successfully!
            </div>
          )}
          {verified === "false" && (
            <div className="bg-red-600 text-black p-[10px] rounded-[3px]">
              Invalid Account
            </div>
          )}
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Amount is required",
              },
              {
                max: user.balanceAmount,
                message: "Insufficient balance",
              },
            ]}
          >
            <input
              type="text"
              className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-full py-[8px] px-[10px] outline-none"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <input
              type="text"
              className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-full py-[8px] px-[10px] outline-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Item>
          <div className="flex justify-end gap-3 items-center">
            <button className="outline p-0.5 px-2 text-primary w-fit text-lg mt-1.5">
              Cancel
            </button>
            {verified === "true" && (
              <button className="bg-primary p-1 px-4 text-white w-fit text-lg mt-1.5">
                Request
              </button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

NewRequestModal.propTypes = {
  showRequestModal: PropTypes.bool,
  setShowRequestModal: PropTypes.func,
  reloadData: PropTypes.func,
};

export default NewRequestModal;

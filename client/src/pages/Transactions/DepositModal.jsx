import { Modal, Form, message } from "antd";
import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { DepositFunds } from "../../api/transaction";
import PropTypes from "prop-types";

const DepositModal = ({
  showDepositModal,
  setShowDepositModal,
  reloadData,
}) => {
  const [amount = 10, setAmount] = useState(10);
  const onToken = async (token) => {
    try {
      const response = await DepositFunds({ token, amount });
      if(response.success)
      {
        message.success(response.message);
        reloadData();
        setShowDepositModal(false);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };
  return (
    <Modal
      title="Deposit"
      open={showDepositModal}
      onCancel={() => setShowDepositModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-1">
        <Form layout="vertical">
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please enter the amount to deposit",
              },
            ]}
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-1 border-solid border-rgb(86,86,86) hover:border-rgb(34,34,34) w-full py-[8px] px-[10px] outline-none"
            />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <button className="outline px-2 text-primary w-fit text-lg mt-1.5">
              Cancel
            </button>
            <StripeCheckout
              token={onToken}
              currency="inr"
              amount={amount * 100}
              shippingAddress
              stripeKey="pk_test_51POHNnRt2X24lwgzSFXQZCSmwAwcpkpC9EExWl5FXXJi2BvNGw7BafyoupVzqOTKeklNkJjDLyAq17ZXtlYBDEM500Zeed88KU"
            >
              <button
                className="bg-primary p-1.5 px-4 text-white w-fit text-lg mt-1.5"
                onClick={() => {
                  setShowDepositModal(false);
                }}
              >
                Deposit
              </button>
            </StripeCheckout>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

DepositModal.propTypes = {
    showDepositModal: PropTypes.bool.isRequired,
    setShowDepositModal: PropTypes.func.isRequired,
    reloadData: PropTypes.func.isRequired,
}

export default DepositModal;

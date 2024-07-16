import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <PageTitle
        title={`Hello ${user.firstName} ${user.lastName}, Welcome the PayZApp`}
      />
      <div className="bg-red-950 p-3 mt-4 w-[50%] rounded-md uppercase">
        <div className="flex justify-between">
          <h1 className="text-md text-white">Account Number</h1>
          <h1 className="text-md text-white">{user._id}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-white">Balance</h1>
          <h1 className="text-md text-white">Rs. {user.balanceAmount || 0}</h1>
        </div>
      </div>

      <div className="border-2 border-[#cdcdcd] p-3 mt-4 w-[50%] rounded-md uppercase">
        <div className="flex justify-between">
          <h1 className="text-md">Name</h1>
          <h1 className="text-md ">
            {user.firstName} {user.lastName}
          </h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Email</h1>
          <h1 className="text-md ">{user.email}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Mobile Number</h1>
          <h1 className="text-md ">{user.phoneNumber}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Identification Type</h1>
          <h1 className="text-md ">{user.identificationType}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md ">Identification Number</h1>
          <h1 className="text-md">{user.identificationNumber}</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

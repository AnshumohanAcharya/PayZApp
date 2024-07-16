import PropTypes from "prop-types";

const PageTitle = ({title}) => {
  return (
    <div>
      <h1 className="text-xl uppercase">{title}</h1>
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;

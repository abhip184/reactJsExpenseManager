import React from "react";

const TransectionSummary = ({
  transection,
  handleDelete,
  handleEdit
}) => {
  console.log(transection);
  const discription =
    transection.type === "transfer" ? (
      <p>
        {transection.from.firstName} to {transection.to.firstName}
      </p>
    ) : (
      <p>{transection.type} by owner</p>
    );

  const icon = () => {
    if (transection.type === "transfer")
      return <i className="material-icons circle blue">swap_vert</i>;
    else if (transection.type === "income")
      return <i className="material-icons circle green">trending_up</i>;
    else return <i className="material-icons circle red">trending_down</i>;
  };
  return (
    <li className="collection-item avatar hoverable">
      {icon()}
      <span className="title">
        <strong>{transection.amount}</strong>Rs - {transection.category}
      </span>
      <a href="#!">
        <i
          className="material-icons edit right hoverable"
          onClick={() => {
            handleEdit(
              transection._id,
              transection.category,
              transection.amount
            );
          }}
        >
          edit
        </i>
      </a>
      <a href="#!">
        <i
          className="material-icons edit right hoverable"
          onClick={() => {
            handleDelete(transection._id);
          }}
        >
          delete
        </i>
      </a>
      <span>
        <br></br>
        {new Date(transection.atDate).toDateString()}
        {discription}
      </span>
    </li>
  );
};

export default TransectionSummary;

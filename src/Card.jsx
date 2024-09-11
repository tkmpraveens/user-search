const Card = ({ user }) => {
  const { lastName, firstName, email, phone } = user ?? {};

  return (
    <div className="card">
      <span className="attribute attribute--name">{`${lastName} ${firstName}`}</span>
      <span className="attribute">{email}</span>
      <span className="attribute">{phone}</span>
    </div>
  );
};

export default Card;

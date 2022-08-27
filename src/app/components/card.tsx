interface ICardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({ title, children }) => {
  return (
    <>
      <div className="card">
        <h6 className="card__title">{title}</h6>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Card;

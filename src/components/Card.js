export const Card = ({ title, price, description, image }) => {
  return (
    <div className="card p-3 shadow-sm border rounded">
      {image && <img src={image} alt={title} className="card-img-top" />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{description}</p>
        <h6 className="card-subtitle mb-2 text-primary">Price: ₹{price}</h6>
      </div>
    </div>
  );
};


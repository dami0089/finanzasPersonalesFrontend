import PropTypes from "prop-types"; // Importa PropTypes

export const OverviewCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
      <span className="text-3xl mr-4">{icon}</span>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

// Aquí definimos las propTypes para el componente OverviewCard
OverviewCard.propTypes = {
  title: PropTypes.string.isRequired, // Indica que title es un prop de tipo string y es requerido
  value: PropTypes.string.isRequired, // Indica que value es un prop de tipo string y es requerido
  icon: PropTypes.string.isRequired, // Indica que icon es un prop de tipo string y es requerido
};

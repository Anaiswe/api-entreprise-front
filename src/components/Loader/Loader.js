import "./loader.css";

const Loader = ({theme}) => {
  const className = theme === "bg-dark" ? "-dark" : "-light";
  const skeletons = Array(12).fill(null); // Créer un tableau de 12 éléments pour générer 12 cartes de squelette

  return (
    <div className={`cards-container${className}`}>
      {skeletons.map((_, index) => (
        <div className={`card${className}`} key={index}>
          <div className={`card-content${className}`}>
            <h3 className= "c-skeleton-line"/>
            <p className="c-skeleton-line"/> 
            <p className="c-skeleton-line"/> 
            <p className="c-skeleton-line"/> 
          </div>
        </div>
      ))}
    </div>
  );
};
  
export default Loader;
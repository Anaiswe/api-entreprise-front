import "./loader.css";

const Loader = ({theme}) => {
  const className = theme === "bg-dark" ? "-dark" : "-light";
  const skeletons = Array(12).fill(null);

  return (
    <div className={`cards-container${className}`}>
      {skeletons.map((_, index) => (
        <div className={`card${className}`} key={index}>
          <div className={`card-content${className}`}>
            <p className= "c-skeleton-line"/>
            <p className="c-skeleton-line"/> 
            <p className="c-skeleton-line"/> 
          </div>
        </div>
      ))}
    </div>
  );
};
  
export default Loader;
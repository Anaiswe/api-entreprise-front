import { RevolvingDot } from  'react-loader-spinner'
import "./loader.css"

const Loader = () => {
    return (
      <div className="loader">
        <span className='loader-text'>Loading</span>
        <RevolvingDot
          visible={true}
          height="160"
          color = "black"
          width="160"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  };
  
  export default Loader;

const Card = ({ title, children }) => {
    return (
      <div className="
        bg-gray-800/80 
        backdrop-blur-sm
        shadow-md 
        rounded-2xl 
        p-5 
        border border-gray-700 
        transition duration-300 
        hover:shadow-xl 
        hover:scale-[1.02]
      ">
        
        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4 text-white tracking-wide">
          {title}
        </h2>
  
        {/* CONTENT */}
        <div className="text-gray-300 text-sm leading-relaxed space-y-2">
          {children}
        </div>
  
      </div>
    );
  };
  
  export default Card;
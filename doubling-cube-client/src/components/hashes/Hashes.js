import React from 'react';

const Hashes = ({onChange,selectedComponent}) => {
    let sortByCMCClass = "btn";
    let sortByColorClass = "btn";
    if (selectedComponent === 'sortByCMC'){
        sortByCMCClass = 'btn-primary';
    }else{
        sortByColorClass = 'btn-primary';
    }
    
    return (
        <div>
            <input className={sortByCMCClass} type="button"
                   name="sortByCMC" value="Sort By CMC"
                   onClick={onChange}/>
            <input className={sortByColorClass} type="button"
                   name="sortByColor" value="Sort By Color"
                   onClick={onChange}/>
        </div>

    );
};
export default Hashes;
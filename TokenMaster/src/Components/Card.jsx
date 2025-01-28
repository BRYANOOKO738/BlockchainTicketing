import { ethers } from 'ethers'

const Card = ({ occasion, toggle, setToggle, setOccasion }) => {
  const togglePop = () => {
    setOccasion(occasion)
    toggle ? setToggle(false) : setToggle(true)
  }

  return (
    <div className='card row'>
      <div className='col'>
        <h3 className='card__name text-success shadow-name'>
          {occasion.name}
        </h3>
        <p className='card__location'>
            <span className='m-2'><i class="bi bi-geo-alt-fill "></i></span>
          <small>{occasion.location}</small>
        </p>
        <p className='card__date'>
          <strong>{occasion.date}</strong><br />{occasion.time}
        </p>


   <div className='d-flex '>
        <p className='card__cost text-warning'>
          <strong>
            {ethers.utils.formatUnits(occasion.cost.toString(), 'ether')}
          </strong>
          ETH
        </p>

        {occasion.tickets.toString() === "0" ? (
          <button
            type="button"
            className='card__button--out'
            disabled
          >
            Sold Out
          </button>
        ) : (
          <button
            type="button"
            className='card__button'
            onClick={() => togglePop()}
          >
            View Seats
          </button>
        )}
        </div>
      </div>

     
    </div >
  );
}

export default Card;
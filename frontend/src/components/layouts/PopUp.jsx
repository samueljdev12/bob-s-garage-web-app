import React from 'react'
import PropTypes from 'prop-types'

const PopUp = props => {
  return ( 
    <div className="container py-5">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="success"
        style={{ display: "none" }}
      >
        Open Popup
      </button>

      <div
        className="modal fade"
        id="success"
        tabIndex="-1"
        aria-labelledby="success"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-success text-center" id="success">
                Success
              </h5>
            </div>
            <div className="modal-body text-center">Service updated with success.</div>
            <div className="text-center">
               <p className='message'>You will be redirected in 2 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PopUp.propTypes = {

}

export default PopUp

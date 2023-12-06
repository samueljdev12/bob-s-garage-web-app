const Loading = ({message}) => {
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75">
        <button class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">{message}...</span>
        </button>
      </div>
    )
}

export default Loading;
import { Spinner } from "react-bootstrap"

const Loading = () => {
    return (
        <div className="container d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
        </div>
    )
}

export default Loading

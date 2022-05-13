import { useLocation, useNavigate, useParams } from "react-router-dom"

export const WithRouter = (Component) => {
    function ComponentWithRouter(props) {
        return <Component {...props} {...useNavigate()} {...useLocation()} />
    }
    return ComponentWithRouter
}

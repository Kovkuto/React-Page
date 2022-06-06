import { Suspense } from 'react'

const withSuspense = (Component, Fallback) => {
    return (props) => {
        return <Suspense fallback={Fallback?Fallback:<h1>Loading...</h1>}>
            <Component {...props}/>
        </Suspense>
    }
}

export default withSuspense

import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: null
        }
    }

    static getDerivedStateFromProps(error) {
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log('Errorboundary caught an error: ', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong...displaying ErrorBoundary</h2>
                </div>
            )}
    }
}

export default ErrorBoundary
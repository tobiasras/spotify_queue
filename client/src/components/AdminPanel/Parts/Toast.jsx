const Toast = (props) => {
    let textColor
    let borderColor

    switch (props.type) {
        case "error":
            textColor = "text-red-400"
            borderColor = "border-red-400"
            break;
        case "success":
            textColor = "text-green-400"
            borderColor = "border-green-400"
            break
        default:
            textColor = "text-gray-400"
            borderColor = "border-gray-400"
    }

    return (
        <div className={`${borderColor} border rounded p-3 text-center`}>
            <p className={`${textColor}`}>{props.text}</p>
        </div>

    )
}

export default Toast
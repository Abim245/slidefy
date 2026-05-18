
function StatusIndicator(props: { status: string }){
    const { status } = props;
    return (
               <div>
            <h1>{status}</h1>
            {  status === "idle" &&
                <p>idle</p>
            }
            {status === "extracting" &&
                <p>extracting</p>
            }
            {status === "done" &&
                <p>Done</p>
            }
            
        </div>
    )
}

export default StatusIndicator;
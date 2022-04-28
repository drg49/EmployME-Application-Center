import React from "react";

export default function JobApplication(props) {

    const companyName = props.match.params.company;
    const jobId = props.match.params.jobKey

    React.useEffect(() => console.log(`Company: ${companyName}, JobId: ${jobId}`), [])

    return (
        <p>Application</p>
    )
}
import React from 'react'
import { useHistory } from "react-router-dom";

export default function InfoBox({title, paragraph, buttonText, link}) {
    const history = useHistory();

    return (
        <div id="info-box">
          <p>{title}</p>
          <p id="text">{paragraph}</p>
          <button
            onClick={() => history.push(link)}
          >
            {buttonText}
          </button>
        </div>
    )
}
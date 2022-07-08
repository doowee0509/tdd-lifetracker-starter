import * as React from "react"
import "./SummaryStat.css"

export default function SummaryStat({stat, label, substat}) {
    return (
        <div className="summary-stat">
            <div className="detail">
                <p className="stat-label">{label}</p>
                <h1 className="primary-statistic">{parseInt(stat).toFixed(1)}</h1>
                <small className="secondary-statistic">{substat}</small>
            </div>
        </div>
    )
}
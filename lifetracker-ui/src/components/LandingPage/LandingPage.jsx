import * as React from "react"
import "./LandingPage.css"
import bgImg from "../../assets/smartwatch.svg"
import fitness from "../../assets/workout.svg"
import food from "../../assets/porridge.svg"
import rest from "../../assets/resting.svg"
import planner from "../../assets/planner.svg"
export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="hero">
                <img src={bgImg} alt="landing image" className="hero-img" />
                <h1>Life Tracker</h1>
                <p className="cta">Helping you take back control of your world</p>
            </div>
            <div className="tiles">
                <div className="tile">
                    <img src={fitness} alt="Fitness" />
                    <p>Fitness</p>
                </div>
                <div className="tile">
                    <img src={food} alt="Food" />
                    <p>Food</p>
                </div>
                <div className="tile">
                    <img src={rest} alt="Rest" />
                    <p>Rest</p>
                </div>
                <div className="tile">
                    <img src={planner} alt="Planner" />
                    <p>Planner</p>
                </div>
            </div>
        </div>
    )
}

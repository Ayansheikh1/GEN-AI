import React from 'react'
import '../style/home.scss'

const Home = () => {
  return (
    <main className='home'>
        <div className="interview-input-group">

            <div className="left">
                <p>Job Description</p>
                <textarea name="jobDescription" id="jobDescription" placeholder='Enter job description here...'></textarea>
            </div>

            <div className="right">
                
                <div className="input-group">
                    <p>Resume <small className='highlight'>(Use resume and self description together for best results)</small></p>
                    <label className="file-label" htmlFor="resume">Upload Resume</label>
                    <input hidden type="file" id="resume" name='resume' accept='.pdf' />

                </div> 

                <div className="input-group">
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder='Enter self description here...'></textarea>
                </div>

                <button className='button primary-button'>Generate Interview Report</button>
            </div>

        </div>
    </main>
    )
}

export default Home

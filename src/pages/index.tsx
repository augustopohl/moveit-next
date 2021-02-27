import { CompletedChallenges } from '../components/CompletedChallenges';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Switch from 'react-switch'

import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')

    console.log(typeof(theme))
    console.log(props)
  }

  return (
    <div className={`MyApp ${theme}`}>
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <div className={styles.switchButton}>
          <DarkModeSwitch
                  onChange={toggleTheme}
                  checked={theme === 'light'}
                  moonColor={'black'}
                  sunColor={'white'}
                />
          </div>
          
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //API call
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
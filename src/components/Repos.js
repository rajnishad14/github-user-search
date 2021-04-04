import React, { useContext } from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useContext(GithubContext)
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    if (!language) return total
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    return total
  }, {})
  languages = Object.values(languages)
  const starsData = languages.map((item) => {
    return { ...item, value: item.stars }
  })

  //stars and forks for bar charts
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks_count } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks_count] = { label: name, value: forks_count }
      return total
    },
    {
      stars: {},
      forks: {},
    }
  )

  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={languages} />
        <Column3D data={stars} />
        <Doughnut2D data={starsData} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos

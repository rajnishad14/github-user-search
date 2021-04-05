import React, { useState, useEffect, createContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = createContext()

const GithubProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  //get user
  const searchGithubUser = async (user) => {
    togleError(false, '')
    setIsLoading(true)
    // getting user
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      setUser(response.data)
      const { followers_url, repos_url } = response.data
      //getting repos

      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((result) => {
          const [repos, followers] = result
          setRepos(repos.value.data)
          setFollowers(followers.value.data)
        })
        .catch((err) => console.log(err))
    } else {
      togleError(true, 'There is no user with this username')
    }
    checkLimit()
    setIsLoading(false)
  }

  //check limit
  const checkLimit = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          togleError(true, 'You have exeded your hourly rate limit!')
        }
      })
      .catch((err) => console.log(err))
  }
  const togleError = (show = false, msg = '') => {
    setError({ show, msg })
  }
  useEffect(checkLimit, [])
  return (
    <GithubContext.Provider
      value={{
        user,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }

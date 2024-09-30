import React, { useState, useEffect } from "react"
import { Form, useActionData } from "react-router-dom"

import { setToken } from '../utils/helpers/common'

interface FormData {
  symbol: string;
  faction: string;
}

interface ApiResp {
  error?: string;
  data?: {
    token: string;
    [key: string]: any;
  };
}

export default function NewGame() {

  // States
  const [agentData, setAgentData] = useState<string>("")
  const [gameToken, setGameToken] = useState<string>("")
  const [form, setForm] = useState<FormData>({ symbol: "", faction: "COSMIC" })

  // Access the response received from user registration
  const newResp = useActionData() as ApiResp | undefined

  // Set agentData and token state variables from response to registration action once received
  useEffect(() => {
    console.log("newResp:", newResp)
    if (newResp && !newResp.error) {
      setAgentData(JSON.stringify(newResp, null, 2))
      if (newResp.data?.token) {
        setToken(newResp.data.token)
        setGameToken(newResp.data.token)
      }
    } else if (newResp?.error) {
      console.error("Error from API:", newResp.error)
    }
  }, [newResp])

  // Check agentData and token state variables have been updated successfully after registration
  useEffect(() => {
    console.log("agentData:", agentData)
    console.log("token:", gameToken)
  }, [agentData, gameToken])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prevForm => ({ ...prevForm, [name]: value }))
  }

  return (
    <section>
      <h1>New Game</h1>
      <p>Once registered, your game access token will be saved to local storage. Record this safely for future play.</p>
      <Form method="post">
        <input
          name="symbol"
          value={form.symbol}
          onChange={handleInputChange}
        />
        <input
          name="faction"
          value={form.faction}
          onChange={handleInputChange}
        />
        <button type="submit">Start New Game</button>
      </Form>
      {/* Report response status to user */}
      {gameToken && <p>Registered successfully, now check out your contracts through the game navigation dropdown.</p>}
      {newResp?.error && <p>Registration failed</p>}
      {/* Display the agent's token and response data */}
      <pre>Game access token: {gameToken}</pre>
      <pre>Agent: {agentData}</pre>
    </section>
  )
}
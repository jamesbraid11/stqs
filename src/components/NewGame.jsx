import { useState, useEffect } from "react"
import { Form, useActionData } from "react-router-dom"

import { setToken } from '../utils/helpers/common'

export default function NewGame() {

  // States
  const [agentData, setAgentData] = useState("")
  const [gameToken, setGameToken] = useState("")
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" })

  // Access the response received from user registration
  const resp = useActionData()

  // Set agentData and token state variables from response to registration action once received
  useEffect(() => {
    console.log("resp:", resp)
    if (resp && !resp.error) {
      setAgentData(JSON.stringify(resp, null, 2))
      setToken(resp.data?.token)
      setGameToken(resp.data?.token)
    } else if (resp?.error) {
      console.error("Error from API:", resp.error)
    }
  }, [resp])

  // Check agentData and token state variables have been updated successfully after registration
  useEffect(() => {
    console.log("agentData:", agentData)
    console.log("token:", gameToken)
  }, [agentData, resp])

  return (
    <>
      <h1>New Game</h1>
      <p>Once registered, your game access token will be saved to local storage. Record this safely for future play.</p>
      <Form method="post">
        <input
          name="symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.currentTarget.value })}
        />
        <input
          name="faction"
          value={form.faction}
          onChange={(e) => setForm({ ...form, faction: e.currentTarget.value })}
        />
        <button type="submit">Start New Game</button>
      </Form>
      {gameToken && <p>Registered successfully, now check out your contracts through the game navigation dropdown.</p>}
      {resp?.error && <p>Registration failed</p>}
      {/* Display the token and response data */}
      <pre>Game access token: {gameToken}</pre>
      <pre>Agent: {agentData}</pre>
    </>
  )
}
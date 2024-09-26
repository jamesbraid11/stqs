import { useState, useEffect } from "react"
import { Form, useActionData } from "react-router-dom"

import { setToken, getToken } from '../utils/helpers/common'

export default function ContinueGame() {

  // State
  // Initialise form with token from local storage if available
  const [form, setForm] = useState({ token: getToken() || "" })
  const [agentId, setAgentId] = useState("")

  // Access the response received from user log in request
  const continueResp = useActionData()

  // Set token in local storage when form.token changes, but only if it's not empty
  useEffect(() => {
    if (form.token) {
      setToken(form.token)
      console.log("token saved:", getToken())
    }
  }, [form.token])

  // Set response from registration request to agentId state variable if received
  useEffect(() => {
    if (continueResp && !continueResp.error) {
      setAgentId(JSON.stringify(continueResp, null, 2))
    } else if (continueResp?.error) {
      console.error("Error from API:", continueResp.error)
    }
  }, [continueResp])

  // Check agentId state variable has been updated successfully after registration
  useEffect(() => {
    console.log("agentId:", agentId)
  }, [agentId])

  return (
    <section>
      <h1>Continue Game</h1>
      <Form
        method="post"
        onSubmit={() => {
          // Only save token to local storage if field not empty
          if (form.token) {
            setToken(form.token)
            console.log("token set on form submit:", getToken())
          }
        }}
      >
        <input
          name="token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.currentTarget.value })}
        />
        <button type="submit">Continue Game</button>
      </Form>
      {/* Report response status to user */}
      {agentId && <p>Logged in successfully</p>}
      {continueResp?.error && <p>Log in failed</p>}
      {/* Display the agent's ID data */}
      <pre>Agent ID: {agentId}</pre>
    </section>
  )
}

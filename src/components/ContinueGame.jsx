import { useState, useEffect } from "react"
import { Form, useActionData } from "react-router-dom"

import { setToken } from '../utils/helpers/common'

export default function ContinueGame() {

  // State
  const [form, setForm] = useState({ token: "" })
  const [agentId, setAgentId] = useState("")

  // Access the response received from user log in
  const resp = useActionData()

  // Set token state variable from user's form entry
  useEffect(() => {
    setToken(form.token)
    console.log("token:", token)
  }, [form])

  // Set agentId state variable from response to registration action once received
  useEffect(() => {
    console.log("resp:", resp)
    if (resp && !resp.error) {
      setAgentId(JSON.stringify(resp, null, 2))
    } else if (resp?.error) {
      console.error("Error from API:", resp.error)
    }
  }, [resp])

  // Check agentId state variable has been updated successfully after registration
  useEffect(() => {
    console.log("agentId:", agentId)
  }, [agentId])

  return (
    <>
      <h1>Continue Game</h1>
      <Form method="post">
        <input
          name="token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.currentTarget.value })}
        />
        <button type="submit">Continue Game</button>
      </Form>
      {agentId.data?.accountId && <p>Logged in successfully</p>}
      {resp?.error && <p>Log in failed</p>}
      <pre>Agent ID: {agentId}</pre>
    </>
  )
}
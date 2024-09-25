import { useState, useEffect } from "react"
import { Form, useActionData } from "react-router-dom"

import { setToken, getToken } from '../utils/helpers/common'

export default function ContinueGame() {
  // State
  const [form, setForm] = useState({ token: getToken() || "" }) // Initialize with token from local storage if available
  const [agentId, setAgentId] = useState("")

  // Access the response received from user log in
  const resp = useActionData()

  // Set token in local storage when form.token changes, but only if it's non-empty
  useEffect(() => {
    if (form.token) {
      setToken(form.token)
      console.log("token saved:", getToken())
    }
  }, [form.token])

  // Set agentId state variable from response to registration action once received
  useEffect(() => {
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
      <Form
        method="post"
        onSubmit={() => {
          // Only save non-empty token to local storage
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
      {agentId && <p>Logged in successfully</p>}
      {resp?.error && <p>Log in failed</p>}
      <pre>Agent ID: {agentId}</pre>
    </>
  )
}

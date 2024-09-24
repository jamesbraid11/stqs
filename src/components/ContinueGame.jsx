import { useState, useEffect } from "react"
import { Form, useActionData, useOutletContext } from "react-router-dom";

export default function ContinueGame() {

  // State
  const [form, setForm] = useState({ token: "" })
  const [agentData, setAgentData] = useOutletContext()

  // response received from user submitted action
  const res = useActionData()

  useEffect(() => {
    console.log("res:", res)
    if (res && !res.error) {
      setAgentData(JSON.stringify(res, null, 2))
    } else if (res?.error) {
      console.error("Error from API:", res.error);
    }
  }, [res])

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
      {agentData?.data?.token && <p>Logged in successfully</p>}
      {res?.error && <p>Log in failed</p>}
    </>
  )
}
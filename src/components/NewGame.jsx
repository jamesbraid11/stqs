import { useState, useEffect } from "react"
import { Form, useActionData, useOutletContext } from "react-router-dom";

export default function NewGame() {

  // States
  const [token, setToken] = useState()
  const [agentData, setAgentData] = useOutletContext()
  const [form, setForm] = useState({ symbol: "", faction: "COSMIC" })

  // response received from user submitted action
  const res = useActionData()

  useEffect(() => {
    console.log("res:", res)
    if (res && !res.error) {
      setAgentData(JSON.stringify(res, null, 2))
      setToken(res.data?.token);
      console.log("agentData:", agentData)
      console.log("token:", token)
    } else if (res?.error) {
      console.error("Error from API:", res.error);
    }
  }, [res])

  return (
    <>
      <h1>New Game</h1>
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
      {agentData?.data?.token && <p>Registered successfully</p>}
      {res?.error && <p>Log in failed</p>}
      {/* Display the token and response data */}
      <pre>Game access token: {token}</pre>
      <pre>Response: {agentData}</pre>
    </>
  );
}
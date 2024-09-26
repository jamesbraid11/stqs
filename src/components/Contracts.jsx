
import { useLoaderData, Form, useActionData } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Contracts() {

  // Access the loaded data using useLoaderData
  const load = useLoaderData()

  // Access the response received from user contract accept request
  const resp = useActionData()

  // State
  const [contracts, setContracts] = useState("")
  const [form, setForm] = useState({ contractId: "" })
  const [contractAccepted, setContractAccepted] = useState("")

  // Set agentData and token state variables from response to registration action once received
  useEffect(() => {
    console.log("load:", load)
    if (load && !load.error) {
      setContracts(JSON.stringify(load.data, null, 2))
      console.log("contracts:", contracts)
    } else if (load?.error) {
      console.error("Error from API:", load.error)
    }
  }, [load])

    // Check response to user's accept contract request
    useEffect(() => {
      if (resp && !resp.error) {
        setContractAccepted(JSON.stringify(resp.data, null, 2))
        console.log("resp:", resp)
      } else if (resp?.error) {
        console.error("Error from API:", resp.error)
      }
    }, [resp])

  return (
    <>
      <h1>Contracts</h1>
      <p>Enter the id of a contract you would like to accept below.</p>
      <Form method="post">
        <input
          name="contractId"
          value={form.contractId}
          onChange={(e) => setForm({ ...form, contractId: e.currentTarget.value })}
        />
        <button type="submit">Accept Contract</button>
      </Form>
      {contractAccepted && <p>Contract accepted</p>}
      {resp?.error && <p>Something went wrong, please try again</p>}
      <pre>Current contracts: {contracts}</pre>
    </>
  )
}
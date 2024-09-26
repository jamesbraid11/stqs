
import { useLoaderData, Form, useActionData } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Contracts() {

  // Access the loaded data
  const load = useLoaderData()

  // Access the response received from user contract accept request
  const contractsResp = useActionData()

  // State
  const [contracts, setContracts] = useState("")
  const [form, setForm] = useState({ contractId: "" })
  const [contractAccepted, setContractAccepted] = useState("")

  // Set contracts load data to contracts state variable
  useEffect(() => {
    console.log("load:", load)
    if (load && !load.error) {
      setContracts(JSON.stringify(load.data, null, 2))
      console.log("contracts:", contracts)
    } else if (load?.error) {
      console.error("Error from API:", load.error)
    }
  }, [load])

  // Set response from registration request to contractAccepted state variable if received
  useEffect(() => {
    if (contractsResp && !contractsResp.error) {
      setContractAccepted(JSON.stringify(contractsResp.data, null, 2))
      console.log("contractsResp:", contractsResp)
    } else if (contractsResp?.error) {
      console.error("Error from API:", contractsResp.error)
    }
  }, [contractsResp])

  return (
    <section>
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
      {/* Report response status to user */}
      {contractAccepted && <p>Contract accepted</p>}
      {contractsResp?.error && <p>Something went wrong, please try again</p>}
      {/* Display the agent's current contracts data */}
      <pre>Current contracts: {contracts}</pre>
    </section>
  )
}
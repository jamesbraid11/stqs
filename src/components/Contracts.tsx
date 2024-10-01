import { useLoaderData, Form, useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Types
import type { AcceptContractResponse, ContractsLoadData } from '../types/index.ts';
import { getToken } from '../utils/helpers/common.ts';


export default function Contracts() {
  // Access the loaded data
  const load = useLoaderData() as ContractsLoadData;

  // Access the response received from user contract accept request
  const acceptContractResp = useActionData() as AcceptContractResponse | undefined;

  // State
  const [contracts, setContracts] = useState<string>("");
  const [form, setForm] = useState<{ contractId: string }>({ contractId: "" });
  const [contractAccepted, setContractAccepted] = useState<string>("");

  // Set contracts load data to contracts state variable
  useEffect(() => {
    console.log("load:", load);
    if (load && !load.error) {
      setContracts(JSON.stringify(load.data, null, 2));
      console.log("contracts:", contracts);
    } else if (load?.error) {
      console.error("Error from API:", load.error);
    }
  }, [load])

  // Set response from registration request to contractAccepted state variable if received
  useEffect(() => {
    if (acceptContractResp && !acceptContractResp.error) {
      setContractAccepted(JSON.stringify(acceptContractResp.data, null, 2));
      console.log("acceptContractResp:", acceptContractResp);
    } else if (acceptContractResp?.error) {
      console.error("Error from API:", acceptContractResp.error);
    }
  }, [acceptContractResp])

  return (
    <section>
      <h1>Contracts</h1>
      <p>Enter the id of a contract you would like to accept below.</p>
      <Form method="post">
        <input
          name="contractId"
          value={form.contractId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, contractId: e.target.value })}
        />
        <button type="submit">Accept Contract</button>
      </Form>
      {/* Report to user if no token saved to local storage */}
      {!getToken() && <p>Start a new game or continue game to view your contracts.</p>}
      {/* Report response status to user */}
      {contractAccepted && <p>Contract accepted</p>}
      {acceptContractResp?.error && <p>Something went wrong, please try again</p>}
      {/* Display the agent's current contracts data */}
      <pre>Current contracts: {contracts}</pre>
    </section>
  )
}

import { useLoaderData } from "react-router-dom"
import { useEffect } from "react"

export default function Contracts() {

  // Access the loaded data using useLoaderData
  const resp = useLoaderData()

  // 
  useEffect(() => {
    if (resp) {
      console.log('resp:', resp)
    }
  }, [resp])

  return (
    <>
      <h1>Contracts</h1>
      {/* <p>Token: {token}</p> */}
      <pre>{JSON.stringify(resp, null, 2)}</pre>
    </>
  )
}
import { useQuery } from "@apollo/client"
import { Button, useColorMode } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useEffect } from "react"
import { ME } from "../src/queries"

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(ME)
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    console.log("ME QUERY", data)
  }, [data])

  return (
    <Button onClick={toggleColorMode}>
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  )
}

export default Home

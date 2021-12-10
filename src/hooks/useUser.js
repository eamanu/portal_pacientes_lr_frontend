import { useContext } from "react";
import Context from "../contexts/UserContext";

export default function useUser(){
    const {jwt, setJWT} = useContext(Context)
}
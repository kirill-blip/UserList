import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useGetUsers = (userName) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${userName}`);
                setUsers(response.data)
            }
            catch (error) {
                console.error(error)
            }
        };
        
        fetchData();
    }, [userName]);

    return users;
}

export default useGetUsers;
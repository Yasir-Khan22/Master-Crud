import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Home() {

  const queryClient = useQueryClient();

  // fetchUser function wwhich is fetching data from endpoint and then you can log it.
  const fetchUsers = () => axios.get("http://localhost:3010/users").then(((res) => res.data))

  // imported useQuery hook with the following properties.
  const { data, isLoading, error } = useQuery(["users"], fetchUsers);

  /** deleteUser function which takes an id and deletes the coressponding entry related to that specific id.
   At 20, What it does is again refetching data if becomes stale. */

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3010/users/${id}`).then(() => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    });
  };

  // And then conditional rendering the properties which we imported from useQuery Hook.
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error occured while parsing! {error?.message}</div>
  }

  // const [users, setUsers] = useState([])

  // function loadUsers() {
  //   axios.get("http://localhost:3010/users").then((res) => {
  //     setUsers(res.data.reverse());
  //   });
  // }


  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // function deleteUser(id) {
  //   axios.delete(`http://localhost:3010/users/${id}`).then(loadUsers());
  // }


  // function fetchAllUsers() {
  //   const res = axios.get("http://localhost:3010/users").then((data) => console.log(data))
  //   console.log(res)
  // }

  // const { data } = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const data = await fetchAllUsers()
  //     return data
  //   },
  // })

  // function fetchAllUsers() {
  //   axios.get("http://localhost:3010/users");
  // };

  // const deleteUserMutation = useMutation(
  //   (id) => axios.delete(`http://localhost:3010/users/${id}`),
  //   {
  //     onSuccess: () => {
  //       QueryClient.invalidateQueries("users");
  //     },
  //   }
  // );



  // const deleteUserMutation = useMutation((id) => axios.delete(`http://localhost:3010/users/${id}`))

  // const deleteUser = (id) => {
  //   deleteUserMutation.mutate(id, {
  //     onSuccess: () => QueryCache.invalidateQueries("users")
  //   })
  // }

  return (
    <>
      {/* TABLE GOES HERE  */}
      <div className="w-[100vw] h-full justify-center items-center flex flex-col px-10 py-8 mt-8">
        <h1 className="text-3xl font-bold">DATA TABLE</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto mt-8 sm:-mx-6 items-center lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-white px-6 py-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-lg text-white px-6 py-4"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-black border-b-2">

                    {/* MAPPING OR RENDERING ON SCREEN */}

                    {data.map((user, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b-2 border-black"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                          {index + 1}
                        </td>
                        <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="text-xl text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                          {user.phone}
                        </td>
                        <td className="text-sm flex justify-between  items-center text-gray-900 font-bold px-6 py-4 space-x-4 whitespace-nowrap">
                          <Link
                            to={`/users/${user.id}`}
                            className="bg-[#55423d] text-[#ffc0ad] px-6 py-2 rounded-lg"
                          >
                            View
                          </Link>
                          <Link
                            to={`/edit-user/${user.id}`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                          >
                            Edit
                          </Link>
                          <Link
                            onClick={() => deleteUser(user.id)}
                            to={"#"}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

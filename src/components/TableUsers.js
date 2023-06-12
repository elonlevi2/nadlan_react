import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import InfiniteScroll from 'react-infinite-scroller';
import { brokersFetch } from '../client/axiosToBrokers';
import { axoisDeleteUser } from '../client/axiosToDashbord';

function TableUsers() {
    const [users, setUsers] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)

    const addUsers = async ()=> {
        const res = await brokersFetch(pagenum, 10)
        console.log(res)
    
        if (!res.has_more) {
          setHasmore(false)
        }
        setPagenum((prev) => {
            return prev + 1;
        });
    
        const newUserss = [...users, ...res.data]
    
        setUsers(newUserss)
      }
    
    const deleteUser = async (id)=> {
        const res = await axoisDeleteUser(id)
        window.alert(res)
        window.location = '/dashbord'
    }

  return (<>
        <InfiniteScroll
        loadMore={addUsers}
        hasMore={hasmore}
        loader={<div key={0}>loading...</div>}
        >
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>#</th>
                    </tr>
                </thead>
                {users.map((user)=>{return <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={()=>{
                                deleteUser(user.id)
                        }}>Delete</button></td>
                    </tr>
                </tbody> })}

            </Table>
        </InfiniteScroll>

  </>)
}

export default TableUsers